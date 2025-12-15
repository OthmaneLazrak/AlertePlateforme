package org.sid.alerteproject.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

import java.util.Map;

@Data
@AllArgsConstructor @NoArgsConstructor
@Builder
public class AlerteRequestDTO {
    private String id;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime timestamp;
    @JsonProperty("alert_type")
    private String alertType;
    private String severity;
    private Map<String,Object> details;
}
