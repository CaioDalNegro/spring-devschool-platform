package br.com.codeacademyia.codeacademy.repository;

import br.com.codeacademyia.codeacademy.model.Curso;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CursoRepository extends JpaRepository<Curso, UUID> {

    List<Curso> findAllByNome(String nome);
}