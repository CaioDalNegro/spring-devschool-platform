package br.com.codeacademyia.codeacademy.controller;

import br.com.codeacademyia.codeacademy.model.Atividade;
import br.com.codeacademyia.codeacademy.model.DTO.AtividadeDTO;
import br.com.codeacademyia.codeacademy.model.Turma;
import br.com.codeacademyia.codeacademy.repository.AtividadeRepository;
import br.com.codeacademyia.codeacademy.repository.TurmaRepository;
import br.com.codeacademyia.codeacademy.service.AtividadeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/atividades")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AtividadeController {
    private final AtividadeService service;

    @PostMapping
    public ResponseEntity<AtividadeDTO> add(@RequestBody AtividadeDTO dto){
        return ResponseEntity.ok(service.add(dto));
    }

    @GetMapping("/minhasAtividades")
    public ResponseEntity<List<Atividade>> getAtividadesDaTurma(@RequestHeader UUID idTurma){
        return ResponseEntity.ok(service.getTodasAsAtividadesDaTurma(idTurma));
    }


}
