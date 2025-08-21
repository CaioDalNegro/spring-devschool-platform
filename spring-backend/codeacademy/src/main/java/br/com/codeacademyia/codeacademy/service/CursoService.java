package br.com.codeacademyia.codeacademy.service;


import br.com.codeacademyia.codeacademy.model.Curso;
import br.com.codeacademyia.codeacademy.model.Professor;
import br.com.codeacademyia.codeacademy.repository.CursoRepository;
import br.com.codeacademyia.codeacademy.repository.ProfessorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CursoService {
    private final CursoRepository repository;
    private final ProfessorRepository professorRepository;

    public Curso add(Curso c){
        return repository.save(c);
    }

    public List<Curso> getCursos(Curso c){
        return repository.findAllByNome(c.getNome());
    }


    public List<Curso> getCursosDoProfessor(String email) {
        Professor prof = professorRepository.findByEmail(email);
        return repository.findByProfessorId(prof.getId());

    }
}