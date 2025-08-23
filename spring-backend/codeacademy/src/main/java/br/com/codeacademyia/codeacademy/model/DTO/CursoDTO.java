package br.com.codeacademyia.codeacademy.model.DTO;

import lombok.Data;

import java.util.UUID;

@Data
public class CursoDTO {
    private UUID idCurso;
    private String nome;
    private String descricao;

}
