package br.com.codeacademyia.codeacademy.model.DTO;
import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

@Data
public class AtividadeDTO {

    private UUID idTurma;

    private String titulo;

    private String descricao;


    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dataEntrega;


    private String caminho;

}
