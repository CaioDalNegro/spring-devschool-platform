package br.com.codeacademyia.codeacademy.controller;

import java.util.List;

import br.com.codeacademyia.codeacademy.service.AlunoService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.codeacademyia.codeacademy.model.Aluno; // Entidade Aluno

/**
 * Controller responsável por gerenciar requisições relacionadas aos alunos.
 * Utiliza REST API para comunicação com o frontend React.
 */
@RestController
@RequestMapping("/api/alunos") // Caminho base da API
@RequiredArgsConstructor // Injeta automaticamente o AlunoService final via construtor
@CrossOrigin(origins = "http://localhost:3000") // Permitir requisições do frontend React
public class AlunoController {

    // Serviço que contém a lógica de negócio dos alunos
    private final AlunoService service;

    //Retorna a lista de todos os alunos cadastrados.
    @GetMapping
    public List<Aluno> getAlunos() {
        return service.getAlunos();
    }

    //Cria um novo usuário do tipo aluno.
    @PostMapping
    public Aluno criarUsuario(@RequestBody Aluno usuario) {
        return service.add(usuario);
    }

    //Valida o login do aluno.
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Aluno aluno){
        boolean logado = service.login(aluno);

        if (logado) {
            // Retorna o aluno logado como resposta HTTP 200 OK
            return ResponseEntity.ok(aluno);
        } else {
            // Retorna mensagem de erro com status 401 Unauthorized
            return ResponseEntity.status(401).body("Email ou senha inválidos");
        }
    }
}
