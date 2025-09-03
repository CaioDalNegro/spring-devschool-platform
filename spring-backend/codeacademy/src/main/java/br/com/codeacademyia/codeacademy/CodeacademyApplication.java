package br.com.codeacademyia.codeacademy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class CodeacademyApplication {

	public static void main(String[] args) {
		SpringApplication.run(CodeacademyApplication.class, args);
	}

}
