package org.sid.alerteproject.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.sid.alerteproject.enums.TeamType;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
@EqualsAndHashCode(exclude = "alertes")
@ToString(exclude = "alertes")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String prenom;
    @Enumerated(EnumType.STRING)
    private TeamType team;

    // côté inverse : mappedBy = nom du champ propriétaire dans Alerte (ici "userList")
    @ManyToMany(fetch = FetchType.EAGER) // IMPORTANT : EAGER pour charger les alertes
    @JoinTable(
            name = "user_alerte",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "alerte_id")
    )
    @JsonIgnoreProperties("userList")
    @Builder.Default

    private List<Alerte> alertes = new ArrayList<>() {
    };
}
