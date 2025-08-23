package br.com.codeacademyia.codeacademy.model;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

@Entity
@Data
@Table(name = "turma")
public class Turma {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_turma")
    private UUID id;

    @Column(name = "nome_turma")
    private String nome;

    @Column(name = "qtd_alunos")
    private int alunos;

    @Column(name = "qtd_desafios")
    private int desafios;

    @ManyToOne
    @JoinColumn(name = "id_curso")
    @ToString.Exclude
    @JsonBackReference
    private Curso curso;


}
