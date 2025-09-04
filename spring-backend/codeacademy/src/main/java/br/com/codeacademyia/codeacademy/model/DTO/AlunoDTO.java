package br.com.codeacademyia.codeacademy.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AlunoDTO {
    private UUID id;
    private String nome;
    private String email;
}
