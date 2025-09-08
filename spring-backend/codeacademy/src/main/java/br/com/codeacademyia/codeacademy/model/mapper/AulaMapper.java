package br.com.codeacademyia.codeacademy.model.mapper;

import br.com.codeacademyia.codeacademy.model.Atividade;
import br.com.codeacademyia.codeacademy.model.Aula;
import br.com.codeacademyia.codeacademy.model.DTO.AtividadeDTO;
import br.com.codeacademyia.codeacademy.model.DTO.AulaDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public abstract class AulaMapper {
    public abstract Aula toEntity(AulaDTO dto);
    public abstract AulaDTO toDTO(Aula aula);
}
