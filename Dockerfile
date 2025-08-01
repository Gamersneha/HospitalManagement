# Stage 1: Build the application
FROM maven:3.9.6-eclipse-temurin-21 as builder

WORKDIR /app

# Copy the pom and source code
COPY pom.xml .
COPY src ./src

# Package the application (skip tests)
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copy the built jar from the builder stage
COPY --from=builder /app/target/hospital-management.jar .

# Expose port (optional, match your app config)
EXPOSE 8080

# Run the app
ENTRYPOINT ["java", "-jar", "hospital-management.jar"]
