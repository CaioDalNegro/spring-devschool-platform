package br.com.codeacademyia.codeacademy.model.mapper;


import br.com.codeacademyia.codeacademy.model.DTO.TurmaAlunoDTO;
import br.com.codeacademyia.codeacademy.model.TurmaAluno;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public abstract class TurmaAlunoMapper {

    public abstract TurmaAluno toEntity(TurmaAlunoDTO dto);

    public abstract TurmaAlunoDTO toDTO(TurmaAluno turmaAluno);

}
