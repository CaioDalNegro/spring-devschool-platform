package br.com.codeacademyia.codeacademy.controller;

import br.com.codeacademyia.codeacademy.model.Aluno;
import br.com.codeacademyia.codeacademy.model.Atividade;
import br.com.codeacademyia.codeacademy.model.DTO.AlunoDTO;
import br.com.codeacademyia.codeacademy.model.DTO.TurmaAlunoDTO;
import br.com.codeacademyia.codeacademy.model.Turma;
import br.com.codeacademyia.codeacademy.model.TurmaAluno;
import br.com.codeacademyia.codeacademy.service.AlunoService;
import br.com.codeacademyia.codeacademy.service.TurmaAlunoService;
import br.com.codeacademyia.codeacademy.service.TurmaService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/turmaAlunos")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000") // Permitir requisições do frontend React
public class TurmaAlunoController {
    private final TurmaAlunoService turmaAlunoService;


    @PostMapping
    public ResponseEntity<TurmaAlunoDTO> add(@RequestBody TurmaAlunoDTO dto, @RequestParam String emailAluno){
        return ResponseEntity.ok(turmaAlunoService.add(dto, emailAluno));
    }

    @GetMapping("/{idTurma}/alunos")
    public ResponseEntity<List<AlunoDTO>> getAlunosDaTurma(@PathVariable UUID idTurma) {
        return ResponseEntity.ok(turmaAlunoService.getTodosOsAlunosDaTurma(idTurma));
    }


}
