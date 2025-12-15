package org.sid.alerteproject.services;

import org.sid.alerteproject.dto.AlerteRequestDTO;
import org.sid.alerteproject.entities.Alerte;

public interface AlerteService {
    Alerte receiveAndNotify(AlerteRequestDTO dto);

}
