package br.com.codeacademyia.codeacademy.service;

import br.com.codeacademyia.codeacademy.model.Aluno;
import br.com.codeacademyia.codeacademy.model.DTO.AlunoDTO;
import br.com.codeacademyia.codeacademy.model.DTO.TurmaAlunoDTO;
import br.com.codeacademyia.codeacademy.model.Turma;
import br.com.codeacademyia.codeacademy.model.TurmaAluno;
import br.com.codeacademyia.codeacademy.model.mapper.TurmaAlunoMapper;
import br.com.codeacademyia.codeacademy.repository.TurmaAlunoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import br.com.codeacademyia.codeacademy.model.DTO.AlunoDTO;
import br.com.codeacademyia.codeacademy.model.mapper.AlunoMapper;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TurmaAlunoService {
    private final TurmaAlunoRepository repository;
    private final TurmaAlunoMapper mapper;
    private final TurmaService turmaService;
    private final AlunoService alunoService;
    private final AlunoMapper alunoMapper;

    public TurmaAlunoDTO add(TurmaAlunoDTO turmaAlunoDTO, String email){
        Aluno aluno = alunoService.findByEmail(email);
        Turma turma = turmaService.procurarPorId(turmaAlunoDTO.getIdTurma()).orElseThrow();

        TurmaAluno turmaAluno1 = new TurmaAluno();

        // Cria a chave composta
        TurmaAluno.TurmaAlunoId id = new TurmaAluno.TurmaAlunoId();
        id.setIdAluno(aluno.getId());
        id.setIdTurma(turma.getId());
        turmaAluno1.setId(id);

        // Associa entidades
        turmaAluno1.setAluno(aluno);
        turmaAluno1.setTurma(turma);
        turmaAluno1.setDataMatricula(LocalDate.now());

        repository.save(turmaAluno1);
        return mapper.toDTO(turmaAluno1);
    }


    public List<AlunoDTO> getTodosOsAlunosDaTurma(UUID idTurma) {
        List<TurmaAluno> turmasAlunos = repository.findByTurma_Id(idTurma);
        return turmasAlunos.stream()
                .map(ta -> alunoMapper.toDTO(ta.getAluno()))
                .collect(Collectors.toList());
    }

}
