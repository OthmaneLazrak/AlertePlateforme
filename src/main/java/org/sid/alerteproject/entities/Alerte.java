package org.sid.alerteproject.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.sid.alerteproject.converters.DetailsConverter;

import java.time.LocalDateTime;
import java.util.*;

@Entity
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
@EqualsAndHashCode(exclude = "userList")
@ToString(exclude = "userList")
public class Alerte {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime timestamp;
    @Convert(converter = DetailsConverter.class)
    private Map<String,Object> details;
    private String alertType;
    private String severity;

    @ManyToMany(mappedBy = "alertes", fetch = FetchType.LAZY)
    @JsonIgnoreProperties("alertes")
    @Builder.Default

    private List<User> userList = new ArrayList<>();
}
