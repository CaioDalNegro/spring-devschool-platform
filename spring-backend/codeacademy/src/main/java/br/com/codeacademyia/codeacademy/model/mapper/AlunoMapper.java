package br.com.codeacademyia.codeacademy.model.mapper;

import br.com.codeacademyia.codeacademy.model.Aluno;
import br.com.codeacademyia.codeacademy.model.DTO.AlunoDTO;
import org.springframework.stereotype.Component;

@Component
public class AlunoMapper {
    public AlunoDTO toDTO(Aluno aluno) {
        return new AlunoDTO(aluno.getId(), aluno.getNome(), aluno.getEmail());
    }
}
