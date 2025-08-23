package br.com.codeacademyia.codeacademy.model.mapper;

import br.com.codeacademyia.codeacademy.model.Curso;
import br.com.codeacademyia.codeacademy.model.DTO.CursoDTO;
import br.com.codeacademyia.codeacademy.model.Professor;
import br.com.codeacademyia.codeacademy.repository.ProfessorRepository;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.Mapping;

@Mapper(componentModel = "spring")
public abstract class CursoMapper {


    public abstract Curso toEntity(CursoDTO dto);

    public abstract CursoDTO toDTO(Curso curso);

}
