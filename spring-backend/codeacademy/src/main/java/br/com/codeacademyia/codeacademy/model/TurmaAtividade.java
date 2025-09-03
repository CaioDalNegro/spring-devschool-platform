package br.com.codeacademyia.codeacademy.model;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.util.UUID;

@Entity
@Data
@Table(name = "turmaAtividade")
public class TurmaAtividade {
    @EmbeddedId
    private TurmaAtividadeId id;

    @ManyToOne
    @MapsId("idTurma")
    @JoinColumn(name = "id_turma")
    private Turma turma;

    @ManyToOne
    @MapsId("idAtividade")
    @JoinColumn(name = "id_atividade")
    private Atividade atividade;


    @Data
    @Embeddable
    public class TurmaAtividadeId implements Serializable {
        private UUID idTurma;
        private UUID idAtividade;
    }
}

