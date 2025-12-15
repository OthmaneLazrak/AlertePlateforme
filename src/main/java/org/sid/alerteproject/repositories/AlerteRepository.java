package org.sid.alerteproject.repositories;

import org.sid.alerteproject.entities.Alerte;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface AlerteRepository  extends JpaRepository<Alerte, Long> {
}
