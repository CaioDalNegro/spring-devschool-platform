package br.com.codeacademyia.codeacademy.service;

import br.com.codeacademyia.codeacademy.model.Aluno;
import br.com.codeacademyia.codeacademy.model.Curso;
import br.com.codeacademyia.codeacademy.model.DTO.AlunoDTO;
import br.com.codeacademyia.codeacademy.model.DTO.TurmaAlunoDTO;
import br.com.codeacademyia.codeacademy.model.Turma;
import br.com.codeacademyia.codeacademy.model.TurmaAluno;
import br.com.codeacademyia.codeacademy.model.mapper.TurmaAlunoMapper;
import br.com.codeacademyia.codeacademy.repository.TurmaAlunoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import br.com.codeacademyia.codeacademy.model.mapper.AlunoMapper;

import java.time.LocalDate;
import java.util.List;
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

    public TurmaAlunoDTO add(TurmaAlunoDTO turmaAlunoDTO, String email) {
        // 1. Busca aluno e turma
        Aluno aluno = alunoService.findByEmail(email);
        Turma turma = turmaService.procurarPorId(turmaAlunoDTO.getIdTurma())
                .orElseThrow(() -> new RuntimeException("Turma não encontrada"));

        // 2. Cria vínculo TurmaAluno
        TurmaAluno turmaAluno = new TurmaAluno();

        TurmaAluno.TurmaAlunoId id = new TurmaAluno.TurmaAlunoId();
        id.setIdAluno(aluno.getId());
        id.setIdTurma(turma.getId());
        turmaAluno.setId(id);

        turmaAluno.setAluno(aluno);
        turmaAluno.setTurma(turma);
        turmaAluno.setDataMatricula(LocalDate.now());

        repository.save(turmaAluno);

        // 3. Sincroniza com a relação ManyToMany (aluno_curso)
        Curso curso = turma.getCurso();
        if (curso != null && !aluno.getCursos().contains(curso)) {
            aluno.getCursos().add(curso);
            alunoService.add(aluno); // garante persistência no banco
        }

        // 4. Retorna DTO
        return mapper.toDTO(turmaAluno);
    }

    public List<AlunoDTO> getTodosOsAlunosDaTurma(UUID idTurma) {
        List<TurmaAluno> turmasAlunos = repository.findByTurma_Id(idTurma);
        return turmasAlunos.stream()
                .map(ta -> alunoMapper.toDTO(ta.getAluno()))
                .collect(Collectors.toList());
    }
}