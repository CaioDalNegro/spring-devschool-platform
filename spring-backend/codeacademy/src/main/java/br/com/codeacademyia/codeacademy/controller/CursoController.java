package br.com.codeacademyia.codeacademy.controller;

import br.com.codeacademyia.codeacademy.config.JwtUtil;
import br.com.codeacademyia.codeacademy.model.Curso;
import br.com.codeacademyia.codeacademy.model.DTO.CursoDTO;
import br.com.codeacademyia.codeacademy.model.Professor;
import br.com.codeacademyia.codeacademy.service.CursoService;
import br.com.codeacademyia.codeacademy.service.ProfessorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<CursoDTO> add(@RequestBody CursoDTO dto, @RequestHeader("Authorization") String authHeader) {
        if(authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Token ausente");
        }
        String token = authHeader.substring(7);
        String emailProfessor = JwtUtil.getUsername(token);

        CursoDTO cursoCriado = service.add(dto, emailProfessor);
        return ResponseEntity.ok(cursoCriado);
    }


    @GetMapping("/meus")
    public List<Curso> getCursosDoProfessor(@RequestHeader("Authorization") String authHeader) {
        if(authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Token ausente");
        }
        String token = authHeader.substring(7);
        String email = JwtUtil.getUsername(token);
        return service.getCursosDoProfessor(email);
    }
}
