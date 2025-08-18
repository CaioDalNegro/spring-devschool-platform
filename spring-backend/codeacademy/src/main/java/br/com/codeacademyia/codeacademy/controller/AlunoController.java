package br.com.codeacademyia.codeacademy.controller;

import java.util.List;

import br.com.codeacademyia.codeacademy.service.AlunoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.codeacademyia.codeacademy.model.Aluno;

@RestController
@RequestMapping("/api/alunos")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000") // Permitir requisições do React
public class AlunoController {

    private final AlunoService service;

    @GetMapping
    public List<Aluno> getAlunos() {
        return service.getAlunos();
    }

    @PostMapping
    public Aluno criarUsuario(@RequestBody Aluno usuario) {
        return service.add(usuario);
    }

    @PostMapping("/login")
    public boolean login(@RequestBody Aluno aluno){
        return service.login(aluno);
    }
}
