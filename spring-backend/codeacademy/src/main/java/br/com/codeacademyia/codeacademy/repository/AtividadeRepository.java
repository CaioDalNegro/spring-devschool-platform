package br.com.codeacademyia.codeacademy.repository;

import br.com.codeacademyia.codeacademy.model.Atividade;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface AtividadeRepository extends JpaRepository<Atividade, UUID> {

    List<Atividade> findByTurmaId(UUID idTurma);
}
