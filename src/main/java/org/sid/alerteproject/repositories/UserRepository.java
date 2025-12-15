package org.sid.alerteproject.repositories;

import org.sid.alerteproject.entities.Alerte;
import org.sid.alerteproject.entities.User;
import org.sid.alerteproject.enums.TeamType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.util.List;

@RepositoryRestResource
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByTeam(TeamType team);

}
