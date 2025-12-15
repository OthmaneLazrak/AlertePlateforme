package org.sid.alerteproject.services;

import org.sid.alerteproject.dto.AlerteRequestDTO;
import org.sid.alerteproject.entities.Alerte;
import org.sid.alerteproject.entities.User;
import org.sid.alerteproject.repositories.AlerteRepository;
import org.sid.alerteproject.repositories.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@Transactional
public class UserServiceImpl implements UserService{



    private final UserRepository userRepository;

    private final AlerteRepository alerteRepository;

    public UserServiceImpl(UserRepository userRepository, AlerteRepository alerteRepository) {
        this.userRepository = userRepository;
        this.alerteRepository = alerteRepository;
    }

    @Override
    public Alerte ReceiveAlerte(AlerteRequestDTO alerteRequest) {

        // Créer l'alerte
        Alerte alerte = Alerte.builder()
                .timestamp(alerteRequest.getTimestamp()) // LocalDateTime
                .alertType(alerteRequest.getAlertType())
                .severity(alerteRequest.getSeverity())
                .details(alerteRequest.getDetails())
                .build();

        // Sauvegarder pour avoir un ID
        alerte = alerteRepository.save(alerte);

        // 🔹 Récupérer tous les utilisateurs
        List<User> allUsers = userRepository.findAll();

        // 🔹 Lier l’alerte à tous les utilisateurs
        for (User user : allUsers) {
            user.getAlertes().add(alerte);
            alerte.getUserList().add(user);
        }

        // Sauvegarder la relation
        alerteRepository.save(alerte);

        return alerte;
    }

}
