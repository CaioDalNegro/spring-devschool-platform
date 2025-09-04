package br.com.codeacademyia.codeacademy.repository;

import br.com.codeacademyia.codeacademy.model.Aluno;
import br.com.codeacademyia.codeacademy.model.TurmaAluno;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TurmaAlunoRepository extends JpaRepository<TurmaAluno, TurmaAluno.TurmaAlunoId> {
    List<TurmaAluno> findByTurma_Id(UUID idTurma);
}
