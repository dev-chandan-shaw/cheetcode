# Stage 1: Build the JAR using Maven
FROM maven:3.9.6-eclipse-temurin-17 as builder

# Set working directory inside the container
WORKDIR /app

# Copy only the pom.xml first to leverage Docker cache for dependencies
COPY pom.xml .

# Download dependencies (this step caches dependencies if pom.xml hasn't changed)
RUN mvn dependency:go-offline

# Copy the rest of the source code
COPY src ./src

# Build the project and skip tests (remove -DskipTests if you want tests)
RUN mvn clean package -DskipTests

# Stage 2: Run the app using a lightweight JRE image
FROM eclipse-temurin:17-jdk-jammy

# Set working directory inside the container
WORKDIR /app

# Copy the jar file from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose the port your Spring Boot app runs on (default 8080)
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]

 env_file:
      - .envversion: '3.8'

            services:
              spring-app:
                build: .
                ports:
                  - "8080:8080"
                env_file:
                  - .env
