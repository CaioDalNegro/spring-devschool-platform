package br.com.codeacademyia.codeacademy.repository;

import java.util.List;
import java.util.UUID;

import br.com.codeacademyia.codeacademy.model.Curso;
import org.springframework.data.jpa.repository.JpaRepository;

import br.com.codeacademyia.codeacademy.model.Turma;

public interface TurmaRepository extends JpaRepository<Turma, UUID> {
    List<Turma> findByCurso_Id(UUID cursoId);

//    importante nao deixar como ta em que eu pego todas as informaçoes do usaurio logad
//    fazer de forma que eu passe o email do token na hora de criar o novo curso e turma e la no back ele
//    vai pegar o usuario apartir desse email assim nao pegara no front end
//
//
//    fazer a parte de ao cliclar no acessar curso aparece todas as turmas dentro do curso e se vc quiser criar outra ao cliclar nelas vc vai para a pagina da turma

}



