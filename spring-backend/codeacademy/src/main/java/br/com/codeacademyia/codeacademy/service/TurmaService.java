package br.com.codeacademyia.codeacademy.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import br.com.codeacademyia.codeacademy.model.Curso;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import br.com.codeacademyia.codeacademy.model.Turma;
import br.com.codeacademyia.codeacademy.repository.TurmaRepository;

@Service
@RequiredArgsConstructor
public class TurmaService {
    private final TurmaRepository turmaRepository;

    public List<Turma> listarTodas() {
        return turmaRepository.findAll();
    }

    public List<Turma> listarTurmasPorIdCurso(String cid){
        List<Turma> turmas = turmaRepository.findByCurso_Id(UUID.fromString(cid));
        return turmas != null ? turmas : new ArrayList<>();
    }



    public Turma criarTurma(Turma turma) {
        return turmaRepository.save(turma);
    }
}
