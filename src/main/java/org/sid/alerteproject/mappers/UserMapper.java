package org.sid.alerteproject.mappers;

import org.sid.alerteproject.dto.UserResponseDTO;
import org.sid.alerteproject.entities.User;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public UserResponseDTO fromUser(User user){
        UserResponseDTO userResponseDTO= new UserResponseDTO();
        BeanUtils.copyProperties(user,userResponseDTO);
        return userResponseDTO;
    }
}
