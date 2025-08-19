package br.com.codeacademyia.codeacademy.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.codeacademyia.codeacademy.model.Turma;
import br.com.codeacademyia.codeacademy.repository.TurmaRepository;

@RestController
@RequestMapping("/api/turmas")
@CrossOrigin(origins = "http://localhost:3000") // libera acesso para o React
public class TurmaController {

    @Autowired
    private TurmaRepository turmaRepository;

    // GET -> retorna todas as turmas
    @GetMapping
    public List<Turma> getAll() {
        return turmaRepository.findAll();
    }

    // POST -> cria nova turma
    @PostMapping
    public Turma createTurma(@RequestBody Turma turma) {
        return turmaRepository.save(turma);
    }
}
