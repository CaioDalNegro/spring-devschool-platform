package br.com.codeacademyia.codeacademy.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "turmas")
public class Turma {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private int alunos;
    private int desafios;

    // construtores
    public Turma() {}

    public Turma(String nome, int alunos, int desafios) {
        this.nome = nome;
        this.alunos = alunos;
        this.desafios = desafios;
    }
}
