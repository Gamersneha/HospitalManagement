# Use Java 21
FROM eclipse-temurin:21 AS build

WORKDIR /app

COPY . .

RUN ./mvnw clean package -DskipTests

# Final image
FROM eclipse-temurin:21

WORKDIR /app

COPY --from=build /app/target/hospital-management.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
