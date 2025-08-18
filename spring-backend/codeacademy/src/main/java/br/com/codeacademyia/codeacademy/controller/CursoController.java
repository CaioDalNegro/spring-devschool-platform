package br.com.codeacademyia.codeacademy.controller;

import br.com.codeacademyia.codeacademy.model.Curso;
import br.com.codeacademyia.codeacademy.model.Professor;
import br.com.codeacademyia.codeacademy.service.CursoService;
import br.com.codeacademyia.codeacademy.service.ProfessorService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cursos")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class CursoController {
    private final CursoService service;

    @GetMapping
    public List<Curso> getCursos(Curso c) {
        return service.getCursos(c);
    }

    @PostMapping
    public Curso add(@RequestBody Curso c) {
        return service.add(c);
    }

}
