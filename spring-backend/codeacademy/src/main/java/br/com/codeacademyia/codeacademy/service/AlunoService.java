package br.com.codeacademyia.codeacademy.service;

import br.com.codeacademyia.codeacademy.model.Aluno;
import br.com.codeacademyia.codeacademy.model.Curso;
import br.com.codeacademyia.codeacademy.repository.AlunoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AlunoService {
    private final AlunoRepository alunoRepository;

    public Aluno add(Aluno u) {
        return alunoRepository.save(u);
    }

    public List<Aluno> getAlunos() {
        return alunoRepository.findAll();
    }


    public Aluno login(Aluno aluno) {
        return (Aluno) alunoRepository.findByEmailAndSenha(aluno.getEmail(), aluno.getSenha()).orElse(null);
    }

    public Aluno findByEmail(String email) {
        return alunoRepository.findByEmail(email);
    }

    public List<Curso> getCursosDoAluno(String email) {
        Aluno aluno = alunoRepository.findByEmail(email);
        if (aluno == null) {
            throw new RuntimeException("Aluno não encontrado");
        }
        return aluno.getCursos();
    }
}
