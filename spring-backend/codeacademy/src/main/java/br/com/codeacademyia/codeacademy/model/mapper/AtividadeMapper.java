package br.com.codeacademyia.codeacademy.model.mapper;

import br.com.codeacademyia.codeacademy.model.Atividade;
import br.com.codeacademyia.codeacademy.model.DTO.AtividadeDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public abstract class AtividadeMapper {
    public abstract Atividade toEntity(AtividadeDTO dto);
    public abstract AtividadeDTO toDTO(Atividade atividade);
}
