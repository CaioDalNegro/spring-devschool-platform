package br.com.codeacademyia.codeacademy.model.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

@Data
public class AulaDTO {
    private UUID idTurma;

    private String titulo;

    private String descricao;

    private String caminho;
}
