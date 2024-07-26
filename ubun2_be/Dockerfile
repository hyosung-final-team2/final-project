FROM bellsoft/liberica-openjdk-alpine:17

WORKDIR /app

# COPY만 docker-compose 파일의 위치를 기반으로 작동함
COPY . .

# 개행문자 오류 해결 [unix와 window 시스템 차이]
RUN sed -i 's/\r$//' gradlew

# RUN은 현재 파일을 위치를 기반으로 작동함
RUN chmod +x ./gradlew
RUN ./gradlew clean build -x test

ENV JAR_PATH=/app/build/libs
RUN mv ${JAR_PATH}/*.jar /app/app.jar

ENV GOOGLE_APPLICATION_CREDENTIALS=/app/firebase_service_key.json

ENTRYPOINT ["java", "-jar","app.jar"]
