package org.sid.alerteproject.web;

import jakarta.validation.Valid;
import org.sid.alerteproject.dto.AlerteRequestDTO;
import org.sid.alerteproject.entities.Alerte;
import org.sid.alerteproject.services.AlerteServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class AlerteController {

    private final AlerteServiceImpl alerteService;

    public AlerteController(AlerteServiceImpl alerteService) {
        this.alerteService = alerteService;
    }

    @PostMapping("/api/alertes")
    public ResponseEntity<Alerte> receiveFromSensor(@Valid @RequestBody AlerteRequestDTO dto) {
        Alerte created = alerteService.receiveAndNotify(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }


}
