package br.com.codeacademyia.codeacademy.service;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.codeacademyia.codeacademy.model.Turma;
import br.com.codeacademyia.codeacademy.repository.TurmaRepository;

@Service
public class TurmaService {
    private final TurmaRepository turmaRepository;

    public TurmaService(TurmaRepository turmaRepository) {
        this.turmaRepository = turmaRepository;
    }

    public List<Turma> listarTodas() {
        return turmaRepository.findAll();
    }

    public Turma criarTurma(Turma turma) {
        return turmaRepository.save(turma);
    }
}
