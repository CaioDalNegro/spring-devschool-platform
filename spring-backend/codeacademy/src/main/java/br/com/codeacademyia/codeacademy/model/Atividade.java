package br.com.codeacademyia.codeacademy.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import org.springframework.boot.autoconfigure.web.WebProperties;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Data
@EntityListeners(AuditingEntityListener.class)
@Table(name = "atividade", schema = "public")
public class Atividade {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_atividade")
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "id_turma")
    @ToString.Exclude
    @JsonBackReference
    private Turma turma;

    @Column(name = "titulo")
    private String titulo;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "data_entrega")
    private LocalDate dataEntrega;

    @CreatedDate
    @Column(name = "data_publicacao", updatable = false)
    private LocalDate dataPublicacao;

    @Column(name = "caminho")
    private String caminho;
}

