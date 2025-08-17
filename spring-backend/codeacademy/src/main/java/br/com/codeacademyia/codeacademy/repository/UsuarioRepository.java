package br.com.codeacademyia.codeacademy.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.codeacademyia.codeacademy.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

}