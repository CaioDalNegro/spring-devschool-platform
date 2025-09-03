package br.com.codeacademyia.codeacademy.model;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Data
@Table(name = "turmaAluno")
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
    private LocalDate dataMatricula;

    @Data
    @Embeddable
    public class TurmaAlunoId implements Serializable {
        private UUID idTurma;
        private UUID idAluno;
    }
}

