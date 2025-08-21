package br.com.codeacademyia.codeacademy.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@EntityListeners(AuditingEntityListener.class)
@Table(name="professor", schema = "public")
public class Professor {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_professor")
    private UUID id;

    @Column(name = "email")
    private String email;

    @Column(name = "nome")
    private String nome;

    @Column(name = "senha")
    private String senha;


    @OneToMany(mappedBy = "professor")
    @JsonManagedReference
    private List<Curso> cursos = new ArrayList<>();


}