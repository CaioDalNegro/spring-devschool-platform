package br.com.codeacademyia.codeacademy.model;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@EntityListeners(AuditingEntityListener.class)
@Table(name="aluno", schema = "public")
public class Aluno {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_aluno")
    private UUID id;

    @Column(name = "email")
    private String email;

    @Column(name = "nome")
    private String nome;

    @Column(name = "senha")
    private String senha;

    // Na entidade Aluno
    @ManyToMany
    @JoinTable(
        name = "aluno_curso",
        joinColumns = @JoinColumn(name = "id_aluno"),
        inverseJoinColumns = @JoinColumn(name = "id_curso")
    )
    @JsonIgnoreProperties("alunos") // evita loop
    private List<Curso> cursos = new ArrayList<>();
}