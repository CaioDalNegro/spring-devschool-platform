package br.com.codeacademyia.codeacademy.controller;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import br.com.codeacademyia.codeacademy.model.Curso;
import br.com.codeacademyia.codeacademy.repository.CursoRepository;
import br.com.codeacademyia.codeacademy.service.TurmaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.codeacademyia.codeacademy.model.Turma;
import br.com.codeacademyia.codeacademy.repository.TurmaRepository;

@RestController
@RequestMapping("/api/turmas")
@CrossOrigin(origins = "http://localhost:3000") // libera acesso para o React
public class TurmaController {

    @Autowired
    private TurmaService service;
    @Autowired
    private CursoRepository cursoRepository;

    // GET -> retorna todas as turmas
    @GetMapping
    public List<Turma> getAll() {
        return service.listarTodas();
    }

    // POST -> cria nova turma
    @PostMapping
    public Turma criarTurma(@RequestBody Turma turma, @RequestParam String cursoId){
        UUID cid = UUID.fromString(cursoId);
        Curso curso = cursoRepository.findById(cid)
                .orElseThrow(() -> new RuntimeException("Curso não encontrado"));
        turma.setCurso(curso);
        return service.criarTurma(turma);
    }

    @GetMapping("/turmaDetalhes/{turmaId}")
    public ResponseEntity<Optional<Turma>> obterApartirDoId(@PathVariable String turmaId){
        return ResponseEntity.ok(service.procurarPorId(UUID.fromString(turmaId)));

    }

    // GET -> turmas de um curso específico
    @GetMapping("/curso/{cursoId}")
    public List<Turma> getTurmasPorCurso(@PathVariable String cursoId){
        System.out.println("CursoId recebido: " + cursoId);
        List<Turma> turmas = service.listarTurmasPorIdCurso(cursoId);
        System.out.println("lista de turmas: " + turmas);
        return turmas;
    }


}
