import { HttpInterceptorFn } from '@angular/common/http';
import { User } from '../auth/models/user';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const user = localStorage.getItem('user');
  const parsedUser = user ? JSON.parse(user) : null;
  if (!parsedUser) return next(req);
  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${parsedUser.token}`
    }
  })
  return next(req);
};
