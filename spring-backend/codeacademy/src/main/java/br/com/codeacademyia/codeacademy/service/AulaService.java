package br.com.codeacademyia.codeacademy.service;

import br.com.codeacademyia.codeacademy.model.Atividade;
import br.com.codeacademyia.codeacademy.model.Aula;
import br.com.codeacademyia.codeacademy.model.DTO.AulaDTO;
import br.com.codeacademyia.codeacademy.model.Turma;
import br.com.codeacademyia.codeacademy.model.mapper.AtividadeMapper;
import br.com.codeacademyia.codeacademy.model.mapper.AulaMapper;
import br.com.codeacademyia.codeacademy.repository.AtividadeRepository;
import br.com.codeacademyia.codeacademy.repository.AulaRepository;
import br.com.codeacademyia.codeacademy.repository.TurmaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AulaService {
    private final AulaRepository repository;
    private final TurmaRepository turmaRepository;
    private final AulaMapper mapper;

    public AulaDTO add(AulaDTO dto){
        // Busca a turma associada
        Turma turma = turmaRepository.findById(dto.getIdTurma())
                .orElseThrow(() -> new RuntimeException("Aula não encontrada"));

        // Converte DTO para entidade
        Aula aula = mapper.toEntity(dto);

        // Associa a turma
        aula.setTurma(turma);

        // Define data de publicação como hoje
        aula.setDataPublicacao(LocalDate.now());

        // Salva no banco
        Aula salvo = repository.save(aula);

        // Converte de volta para DTO
        return mapper.toDTO(salvo);
    }

    // Retorna todas as atividades de uma turma específica
    public List<Aula> getTodasAsAtividadesDaTurma(UUID idTurma) {
        return repository.findByTurmaId(idTurma);
    }
}
