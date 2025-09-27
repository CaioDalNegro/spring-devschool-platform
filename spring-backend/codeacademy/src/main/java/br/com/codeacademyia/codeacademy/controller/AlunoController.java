package br.com.codeacademyia.codeacademy.controller;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import br.com.codeacademyia.codeacademy.config.JwtUtil;
import br.com.codeacademyia.codeacademy.model.LoginResponse;
import br.com.codeacademyia.codeacademy.model.TipoUsuario;
import br.com.codeacademyia.codeacademy.repository.AlunoRepository;
import br.com.codeacademyia.codeacademy.service.AlunoService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    private final AlunoService alunoService;
    private final AlunoRepository alunoRepository;

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
        Optional<Aluno> aluno = alunoService.findByEmail(email);
        return ResponseEntity.ok(aluno);
    }

    // GET /alunos/{id}/cursos -> mostra cursos e turmas
    @GetMapping("/{id}/cursos")
    public Aluno getCursosDoAluno(@PathVariable UUID id) {
        Optional<Aluno> aluno = alunoRepository.findById(id);
        return aluno.orElseThrow(() -> new RuntimeException("Aluno não encontrado"));
    }
}
