package br.com.codeacademyia.codeacademy.service;

import br.com.codeacademyia.codeacademy.model.Professor;
import br.com.codeacademyia.codeacademy.repository.ProfessorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfessorService {
    private final ProfessorRepository repository;

    public Professor add(Professor p){
        return repository.save(p);
    }

    public boolean login(Professor professor){
        return repository.existsByEmailAndSenha(professor.getEmail(), professor.getSenha());
    }

    public List<Professor> getProfessores() {
        return repository.findAll();
    }
}
