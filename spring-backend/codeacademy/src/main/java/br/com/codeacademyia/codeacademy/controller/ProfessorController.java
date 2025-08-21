package br.com.codeacademyia.codeacademy.controller;

import br.com.codeacademyia.codeacademy.config.JwtUtil;
import br.com.codeacademyia.codeacademy.model.Aluno;
import br.com.codeacademyia.codeacademy.model.LoginResponse;
import br.com.codeacademyia.codeacademy.model.Professor;
import br.com.codeacademyia.codeacademy.model.TipoUsuario;
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

    //vc loga e o navegador salva em forma de token suas informações email e role no localstorage
    //Uma pessoa mal-intencionada pode ver: email e role que estão no token
    //Ela não sabe: senha, dados do banco, nem consegue criar um token válido sem a chave secreta do backend.

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Professor professor) {
        Professor logado = service.login(professor);
        if (logado != null) {
            // 🔑 gera JWT
            String token = JwtUtil.generateToken(logado.getEmail(), "PROFESSOR");
            return ResponseEntity.ok(new LoginResponse(token, TipoUsuario.PROFESSOR));
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
        Professor prof = service.findByEmail(email);
        return ResponseEntity.ok(prof);
    }


}
