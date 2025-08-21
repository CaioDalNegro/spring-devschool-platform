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

    public Professor login(Professor professor) {
        return repository.findByEmailAndSenha(professor.getEmail(), professor.getSenha())
                .orElse(null);
    }


    public List<Professor> getProfessores() {
        return repository.findAll();
    }

    public Professor findByEmail(String email) {
        return repository.findByEmail(email);
    }
}
