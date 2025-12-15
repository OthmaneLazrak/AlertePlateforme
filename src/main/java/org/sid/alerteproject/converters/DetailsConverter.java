package org.sid.alerteproject.converters;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import java.io.IOException;
import java.util.Collections;
import java.util.Map;

@Converter
public class DetailsConverter implements AttributeConverter<Map<String, Object>, String> {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(Map<String, Object> details) {
        if (details == null) {
            return Collections.emptyMap().toString();
        }
        try {
            return objectMapper.writeValueAsString(details);
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("Erreur conversion Map -> JSON", e);
        }
    }

    @Override
    public Map<String, Object> convertToEntityAttribute(String json) {
        if (json == null) return null;

        try {
            return objectMapper.readValue(json, Map.class);
        } catch (IOException e) {
            throw new IllegalArgumentException("Erreur conversion JSON -> Map", e);
        }
    }
}
