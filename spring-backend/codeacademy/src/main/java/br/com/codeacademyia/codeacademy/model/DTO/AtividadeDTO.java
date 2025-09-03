package br.com.codeacademyia.codeacademy.model.DTO;

import jakarta.persistence.Column;
import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

@Data
public class AtividadeDTO {

    private UUID idTurma;

    private String titulo;

    private String descricao;

    private LocalDate dataEntrega;

}
