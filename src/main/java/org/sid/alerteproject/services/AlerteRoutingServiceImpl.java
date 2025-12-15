package org.sid.alerteproject.services;

import org.sid.alerteproject.enums.AlertType;
import org.sid.alerteproject.enums.TeamType;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlerteRoutingServiceImpl {

    public List<TeamType> getTeamsForAlert(AlertType type) {

        return switch (type) {

            case ARP_SPOOFING, DDOS ->
                    List.of(TeamType.RESEAU);

            case SSH_BRUTE_FORCE,NEW_DEVICE, MALWARE ->
                    List.of(TeamType.SYSTEME);

            case SQL_INJECTION ->
                    List.of(TeamType.DEV);

            case PORT_SCAN ->
                    List.of(TeamType.RESEAU, TeamType.SYSTEME, TeamType.DEV);


        };
    }
}
