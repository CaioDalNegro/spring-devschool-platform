package br.com.codeacademyia.codeacademy.controller;

import java.util.List;

import br.com.codeacademyia.codeacademy.config.JwtUtil;
import br.com.codeacademyia.codeacademy.model.LoginResponse;
import br.com.codeacademyia.codeacademy.model.Professor;
import br.com.codeacademyia.codeacademy.model.TipoUsuario;
import br.com.codeacademyia.codeacademy.service.AlunoService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.codeacademyia.codeacademy.model.Aluno; // Entidade Aluno
import br.com.codeacademyia.codeacademy.model.Curso;

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
    private final AlunoService alunoService;

    //Retorna a lista de todos os alunos cadastrados.
    @GetMapping
    public List<Aluno> getAlunos() {
        return alunoService.getAlunos();
    }

    //Cria um novo usuário do tipo aluno.
    @PostMapping
    public Aluno criarUsuario(@RequestBody Aluno usuario) {
        return alunoService.add(usuario);
    }

    //Valida o login do aluno.
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Aluno aluno) {
        Aluno logado = alunoService.login(aluno);
        if (logado != null) {
            // 🔑 gera JWT
            String token = JwtUtil.generateToken(logado.getEmail(), "ALUNO");
            return ResponseEntity.ok(new LoginResponse(token, TipoUsuario.ALUNO));
        } else {
            return ResponseEntity.status(401).body("Email ou senha inválidos");
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getUsuarioLogado(@RequestHeader("Authorization") String authHeader){
        if(authHeader == null || !authHeader.startsWith("Bearer ")){
            return ResponseEntity.status(401).body("token ausente");
        }

        String token = authHeader.substring(7);
        String email = JwtUtil.getUsername(token);
        Aluno aluno = alunoService.findByEmail(email);
        return ResponseEntity.ok(aluno);
    }

    @GetMapping("/meus")
    public List<Curso> getCursosDoAluno(@RequestHeader("Authorization") String authHeader) {
        if(authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Token ausente");
        }
        String token = authHeader.substring(7);
        String email = JwtUtil.getUsername(token);

        return alunoService.getCursosDoAluno(email);
    }
}
