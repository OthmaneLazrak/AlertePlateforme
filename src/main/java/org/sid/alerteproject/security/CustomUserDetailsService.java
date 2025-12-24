package org.sid.alerteproject.security;

package org.sid.alerteproject.security;

import org.sid.alerteproject.entities.User;
import org.sid.alerteproject.repositories.UserRepository;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        User user = userRepository.findByUsername(username);

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getUsername())
                .password(user.getPassword()) // déjà encodé en DB
                .authorities(user.getRoles().toArray(new String[0]))
                .build();
    }
}

