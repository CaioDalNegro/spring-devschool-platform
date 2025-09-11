package br.com.codeacademyia.codeacademy.model.DTO;

import lombok.Data;

import java.util.UUID;

@Data
public class TurmaAlunoDTO {
    private UUID idTurma;

    public void setIdAluno(UUID id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setIdAluno'");
    }
}
