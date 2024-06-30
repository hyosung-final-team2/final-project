package kr.or.kosa.ubun2_be;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class Ubun2BeApplication {

	public static void main(String[] args) {
		SpringApplication.run(Ubun2BeApplication.class, args);
	}

}
