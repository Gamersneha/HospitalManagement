FROM maven:3.9.4-eclipse-temurin-21-alpine

WORKDIR /app

COPY . .

RUN mvn clean install -DskipTests

EXPOSE 8080

CMD ["java", "-jar", "target/hospital-management-0.0.1-SNAPSHOT.jar"]
