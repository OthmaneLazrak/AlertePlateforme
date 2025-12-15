package org.sid.alerteproject.services;

import org.sid.alerteproject.dto.AlerteRequestDTO;
import org.sid.alerteproject.entities.Alerte;

public interface UserService {
    public Alerte ReceiveAlerte(AlerteRequestDTO alerteRequest);
}
