package com.practice.cheetcode.config;
import com.practice.cheetcode.entity.User;
import com.practice.cheetcode.repository.UserRepository;
import com.practice.cheetcode.service.JWTService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Collection;
import java.util.stream.Collectors;

@Component
class OAuth2SuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    @Autowired
    private JWTService jwtService;

    @Autowired
    private UserRepository userRepository;

    @Value("${frontend.url}")
    private String frontendUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
        OAuth2User oauthUser = oauthToken.getPrincipal();

        oauthUser.getAttributes().forEach((k, v) -> System.out.println(k + ": " + v));

        String name = oauthUser.getAttribute("name");
        String email = oauthUser.getAttribute("email");
        String username = oauthUser.getAttribute("login");
        String firstName = oauthUser.getAttribute("given_name");
        String lastName = oauthUser.getAttribute("family_name");
        String profilePictureUrl = oauthUser.getAttribute("picture");

        User user = userRepository.findByEmail(email)
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setEmail(email);
                    newUser.setFirstName(name);
                    newUser.setFirstName(firstName);
                    newUser.setLastName(lastName);
                    newUser.setProfilePictureUrl(profilePictureUrl);
                    return userRepository.save(newUser);
                });

        Collection<? extends GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());



        String token = jwtService.generateToken(email, user.getId(), authorities);

        Cookie jwtCookie = new Cookie("accessToken", token); // Cookie name can be anything

        jwtCookie.setHttpOnly(true); // Prevents JavaScript access
        jwtCookie.setSecure(true); // Should be true in production to send only over HTTPS
        jwtCookie.setPath("/"); // The cookie is available to all paths
        jwtCookie.setMaxAge(60 * 60 * 24); // Set cookie expiration (e.g., 24 hours in seconds)

        response.addCookie(jwtCookie);
        response.sendRedirect(frontendUrl+"signin?token=" + token);
    }

}
