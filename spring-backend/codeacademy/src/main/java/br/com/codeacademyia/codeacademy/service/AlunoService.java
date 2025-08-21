package br.com.codeacademyia.codeacademy.service;

import br.com.codeacademyia.codeacademy.model.Aluno;
import br.com.codeacademyia.codeacademy.repository.AlunoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AlunoService {
    private final AlunoRepository repository;

    public Aluno add(Aluno u) {
        return repository.save(u);
    }

    public List<Aluno> getAlunos() {
        return repository.findAll();
    }


    public Aluno login(Aluno aluno) {
        return (Aluno) repository.findByEmailAndSenha(aluno.getEmail(), aluno.getSenha()).orElse(null);
    }

    public Aluno findByEmail(String email) {
        return repository.findByEmail(email);
    }
}
