package br.com.codeacademyia.codeacademy.repository;

import br.com.codeacademyia.codeacademy.model.TurmaAluno;
import br.com.codeacademyia.codeacademy.model.TurmaAtividade;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TurmaAtividadeRepository extends JpaRepository<TurmaAtividade, TurmaAluno.TurmaAlunoId> {
}