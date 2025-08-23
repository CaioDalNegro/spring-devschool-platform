package br.com.codeacademyia.codeacademy.service;


import br.com.codeacademyia.codeacademy.model.Curso;
import br.com.codeacademyia.codeacademy.model.DTO.CursoDTO;
import br.com.codeacademyia.codeacademy.model.Professor;
import br.com.codeacademyia.codeacademy.model.mapper.CursoMapper;
import br.com.codeacademyia.codeacademy.repository.CursoRepository;
import br.com.codeacademyia.codeacademy.repository.ProfessorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CursoService {
    private final CursoRepository repository;
    private final ProfessorRepository professorRepository;
    private final CursoMapper mapper;

    public CursoDTO add(CursoDTO dto, String emailProfessor) {
        Professor professor = professorRepository.findByEmail(emailProfessor);

        Curso curso = mapper.toEntity(dto);
        curso.setProfessor(professor);
        curso = repository.save(curso);
        return mapper.toDTO(curso);
    }

    public List<Curso> getCursos(Curso c){
        return repository.findAllByNome(c.getNome());
    }


    public List<Curso> getCursosDoProfessor(String email) {
        Professor prof = professorRepository.findByEmail(email);
        return repository.findByProfessorId(prof.getId());

    }
}