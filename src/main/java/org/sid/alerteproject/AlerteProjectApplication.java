package org.sid.alerteproject;

import org.sid.alerteproject.entities.Alerte;
import org.sid.alerteproject.entities.User;
import org.sid.alerteproject.enums.TeamType;
import org.sid.alerteproject.repositories.AlerteRepository;
import org.sid.alerteproject.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@SpringBootApplication
public class AlerteProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(AlerteProjectApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(UserRepository userRepository, AlerteRepository alerteRepository) {
        return args -> {

            // === Exemple d’alerte de base ===
            Alerte a1 = Alerte.builder()
                    .timestamp(LocalDateTime.now())
                    .alertType("SQL_INJECTION")
                    .severity("HIGH")
                    .details(Map.of("message", "Tentative SQL Injection détectée"))
                    .build();
            alerteRepository.save(a1);

            // === Création des utilisateurs par équipe ===
            User u1 = User.builder()
                    .nom("NetworkAdmin")
                    .prenom("Nadia")
                    .team(TeamType.RESEAU) // équipe réseau
                    .build();
            userRepository.save(u1);

            User u2 = User.builder()
                    .nom("SystemAdmin")
                    .prenom("Youssef")
                    .team(TeamType.SYSTEME) // équipe systèmes
                    .build();
            userRepository.save(u2);

            User u3 = User.builder()
                    .nom("DevEngineer")
                    .prenom("Sara")
                    .team(TeamType.DEV) // équipe dev
                    .build();
            userRepository.save(u3);

            // === Associer l’alerte aux utilisateurs si tu veux ===
            u1.getAlertes().add(a1);
            a1.getUserList().add(u1);

            userRepository.save(u1);
            alerteRepository.save(a1);

        };
    }
}
