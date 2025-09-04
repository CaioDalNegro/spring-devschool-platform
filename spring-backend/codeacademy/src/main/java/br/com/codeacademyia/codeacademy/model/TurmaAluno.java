package br.com.codeacademyia.codeacademy.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Data
@Table(name = "turma_aluno")
public class TurmaAluno {

    @EmbeddedId
    private TurmaAlunoId id;

    @ManyToOne
    @MapsId("idTurma") // usa o campo idTurma da chave composta
    @JoinColumn(name = "id_turma")
    private Turma turma;

    @ManyToOne
    @MapsId("idAluno") // usa o campo idAluno da chave composta
    @JoinColumn(name = "id_aluno")
    private Aluno aluno;

    @Column(name = "data_matricula")
    @CreatedDate
    private LocalDate dataMatricula;

    @Data
    @Embeddable
    public static class TurmaAlunoId implements Serializable {
        private UUID idTurma;
        private UUID idAluno;
    }
}

