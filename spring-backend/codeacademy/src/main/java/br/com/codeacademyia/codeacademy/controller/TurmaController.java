package br.com.codeacademyia.codeacademy.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.codeacademyia.codeacademy.model.Turma;
import br.com.codeacademyia.codeacademy.service.TurmaService;

@RestController
@RequestMapping("/api/turmas")
@CrossOrigin(origins = "http://localhost:3000") // libera acesso para o React
public class TurmaController {

    private final TurmaService turmaService;

    public TurmaController(TurmaService turmaService) {
        this.turmaService = turmaService;
    }

    @GetMapping
    public List<Turma> listarTurmas() {
        return turmaService.listarTodas();
    }

    @PostMapping
    public Turma criarTurma(@RequestBody Turma turma) {
        return turmaService.criarTurma(turma);
    }
}
