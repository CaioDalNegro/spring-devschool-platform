package br.com.codeacademyia.codeacademy.controller;

import br.com.codeacademyia.codeacademy.model.Aluno;
import br.com.codeacademyia.codeacademy.model.Professor;
import br.com.codeacademyia.codeacademy.service.ProfessorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/professores")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ProfessorController {
    private final ProfessorService service;

    @GetMapping
    public List<Professor> getProfessores() {
        return service.getProfessores();
    }

    @PostMapping
    public Professor criarUsuario(@RequestBody Professor professor) {

        return service.add(professor);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Professor professor) {
        Professor logado = service.login(professor);
        if (logado != null) {
            return ResponseEntity.ok(logado);
        } else {
            return ResponseEntity.status(401).body("Email ou senha inválidos");
        }
    }

}
