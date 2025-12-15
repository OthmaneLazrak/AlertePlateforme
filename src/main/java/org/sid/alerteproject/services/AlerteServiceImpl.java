package org.sid.alerteproject.services;

import org.sid.alerteproject.dto.AlerteRequestDTO;
import org.sid.alerteproject.entities.Alerte;
import org.sid.alerteproject.entities.User;
import org.sid.alerteproject.enums.AlertType;
import org.sid.alerteproject.enums.TeamType;
import org.sid.alerteproject.repositories.AlerteRepository;
import org.sid.alerteproject.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class AlerteServiceImpl implements AlerteService {


    private final AlerteRepository alerteRepository;

    private final UserRepository userRepository;

    private final SimpMessagingTemplate messagingTemplate;

    private final AlerteRoutingServiceImpl routingService;

    public AlerteServiceImpl(AlerteRepository alerteRepository, UserRepository userRepository, SimpMessagingTemplate messagingTemplate, AlerteRoutingServiceImpl routingService) {
        this.alerteRepository = alerteRepository;
        this.userRepository = userRepository;
        this.messagingTemplate = messagingTemplate;
        this.routingService = routingService;
    }

    @Override
    public Alerte receiveAndNotify(AlerteRequestDTO dto) {

        System.out.println("=== RÉCEPTION ALERTE ===");

        Alerte alerte = Alerte.builder()
                .timestamp(dto.getTimestamp())
                .alertType(dto.getAlertType())
                .severity(dto.getSeverity())
                .details(dto.getDetails())
                .build();

        alerte = alerteRepository.save(alerte);
        System.out.println("Alerte ID sauvegardée : " + alerte.getId());

        // 1️⃣ Déterminer les équipes concernées
        AlertType alertTypeEnum = AlertType.valueOf(dto.getAlertType());
        List<TeamType> targetTeams = routingService.getTeamsForAlert(alertTypeEnum);

        System.out.println("➡️ Alerte destinée aux équipes : " + targetTeams);

        // Objet envoyé au Frontend
        Map<String, Object> alerteData = new HashMap<>();
        alerteData.put("id", alerte.getId());
        alerteData.put("timestamp", alerte.getTimestamp());
        alerteData.put("type", alerte.getAlertType());
        alerteData.put("severity", alerte.getSeverity());
        alerteData.put("details", alerte.getDetails());

        // 2️⃣ Pour chaque équipe concernée
        for (TeamType team : targetTeams) {

            // WebSocket vers l'équipe
            String topic = "/topic/team/" + team.name();
            System.out.println("Envoi WS vers : " + topic);
            messagingTemplate.convertAndSend(topic, alerteData);

            // Récupérer les utilisateurs de cette équipe
            List<User> users = userRepository.findByTeam(team);

            // Associer alertes aux utilisateurs
            for (User u : users) {
                u.getAlertes().add(alerte);
                alerte.getUserList().add(u);
            }
        }

        System.out.println("=== FIN TRAITEMENT ===");
        return alerte;
    }
}
