package br.com.codeacademyia.codeacademy.service;

import br.com.codeacademyia.codeacademy.model.Atividade;
import br.com.codeacademyia.codeacademy.model.DTO.AtividadeDTO;
import br.com.codeacademyia.codeacademy.model.Turma;
import br.com.codeacademyia.codeacademy.model.mapper.AtividadeMapper;
import br.com.codeacademyia.codeacademy.repository.AtividadeRepository;
import br.com.codeacademyia.codeacademy.repository.TurmaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AtividadeService {

    private final AtividadeRepository repository;
    private final TurmaRepository turmaRepository;
    private final AtividadeMapper mapper;

    // Adiciona uma nova atividade com PDF
    public AtividadeDTO add(AtividadeDTO dto) {
        // Busca a turma associada
        Turma turma = turmaRepository.findById(dto.getIdTurma())
                .orElseThrow(() -> new RuntimeException("Turma não encontrada"));

        // Converte DTO para entidade
        Atividade atividade = mapper.toEntity(dto);

        // Associa a turma
        atividade.setTurma(turma);

        // Define data de publicação como hoje
        atividade.setDataPublicacao(LocalDate.now());

        // Salva no banco
        Atividade salvo = repository.save(atividade);

        // Converte de volta para DTO
        return mapper.toDTO(salvo);
    }

    // Retorna todas as atividades de uma turma específica
    public List<Atividade> getTodasAsAtividadesDaTurma(UUID idTurma) {
        return repository.findByTurmaId(idTurma);
    }
}
