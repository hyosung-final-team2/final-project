package kr.or.kosa.ubun2_be;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableAspectJAutoProxy
@EnableJpaAuditing
@EnableScheduling
@SpringBootApplication
public class Ubun2BeApplication {

	public static void main(String[] args) {
		SpringApplication.run(Ubun2BeApplication.class, args);
	}

}
