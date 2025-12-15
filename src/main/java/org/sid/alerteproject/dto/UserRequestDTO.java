package org.sid.alerteproject.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.sid.alerteproject.entities.StatusUser;

@Data
@AllArgsConstructor @NoArgsConstructor
@Builder
public class UserRequestDTO {

    private String nom;
    private String prenom;
    private StatusUser status;
}
