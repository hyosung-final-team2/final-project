//package kr.or.kosa.ubun2_be.domain.alarm.config;
//
//import com.google.auth.oauth2.GoogleCredentials;
//import com.google.firebase.FirebaseApp;
//import com.google.firebase.FirebaseOptions;
//import com.google.firebase.messaging.FirebaseMessaging;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.util.ResourceUtils;
//
//import java.io.FileInputStream;
//import java.io.IOException;
//
//@Slf4j
//@Configuration
//public class FirebaseConfig {
//    @Bean
//    public FirebaseApp firebaseApp() throws IOException {
//        FileInputStream aboutFirebaseFile = new FileInputStream(ResourceUtils.getFile("classpath:firebase_service_key.json"));
//
//        FirebaseOptions options = FirebaseOptions
//                .builder()
//                .setCredentials(GoogleCredentials.fromStream(aboutFirebaseFile))
//                .build();
//        log.info("Fcm Setting Completed");
//        return FirebaseApp.initializeApp(options);
//    }
//
//    @Bean
//    public FirebaseMessaging firebaseMessaging(FirebaseApp firebaseApp) {
//        return FirebaseMessaging.getInstance(firebaseApp);
//    }
//}

package kr.or.kosa.ubun2_be.domain.alarm.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.FirebaseMessaging;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.ResourceUtils;

import java.io.FileInputStream;
import java.io.IOException;

@Slf4j
@Configuration
public class FirebaseConfig {
    @Bean
    public FirebaseApp firebaseApp() throws IOException {
        if (FirebaseApp.getApps().isEmpty()) {
            FileInputStream aboutFirebaseFile = new FileInputStream(ResourceUtils.getFile("classpath:firebase_service_key.json"));

            FirebaseOptions options = FirebaseOptions
                    .builder()
                    .setCredentials(GoogleCredentials.fromStream(aboutFirebaseFile))
                    .build();
            log.info("Fcm Setting Completed");
            return FirebaseApp.initializeApp(options);
        } else {
            return FirebaseApp.getInstance();
        }
    }

    @Bean
    public FirebaseMessaging firebaseMessaging(FirebaseApp firebaseApp) {
        return FirebaseMessaging.getInstance(firebaseApp);
    }
}