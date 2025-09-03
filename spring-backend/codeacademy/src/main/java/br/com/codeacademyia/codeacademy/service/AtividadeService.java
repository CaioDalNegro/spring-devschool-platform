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
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AtividadeService {
    private final AtividadeRepository repository;
    private final TurmaRepository turmaRepository;
    private final AtividadeMapper mapper;

    public AtividadeDTO add(AtividadeDTO a){
        Turma turma = turmaRepository.findById(a.getIdTurma()).orElseThrow(() -> new RuntimeException("Turma não encontrada"));
        Atividade teste = mapper.toEntity(a);
        teste.setTurma(turma);
        teste.setDataPublicacao(LocalDate.now());
        repository.save(teste);
        return mapper.toDTO(teste);
    }

    public List<Atividade> getTodasAsAtividadesDaTurma(UUID id){

        return repository.findByTurmaId(id);
    }

    //VER SE É NECESSARIO O TURMAATIVIDADE PQ ACHO Q ATIVIDSADE NORMAL JA VAI FUNCIONAR
//    parei aqui falta
//
//    fazer ss services basicos
//    fazer a parte do front para add atividades e alunos
//    fazer a párte no front de exibir todos os alunos e atividades

}
