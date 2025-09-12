package br.com.codeacademyia.codeacademy.controller;

import br.com.codeacademyia.codeacademy.model.Aluno;
import br.com.codeacademyia.codeacademy.repository.AlunoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/cursos/aluno")
public class CursoAlunoController {

    private final AlunoRepository alunoRepository;

    public CursoAlunoController(AlunoRepository alunoRepository) {
        this.alunoRepository = alunoRepository;
    }

    // GET /api/cursos/aluno/{id}
    @GetMapping("/{id}")
    public Aluno getCursosDoAluno(@PathVariable UUID id) {
        return alunoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado"));
    }

    // Se quiser exatamente /meus (com base no usuário logado via token):
    @GetMapping("/meus")
    public Aluno getMeusCursos(@RequestHeader("email") String email) {
        return alunoRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado"));
    }
}