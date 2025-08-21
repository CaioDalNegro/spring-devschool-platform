package br.com.codeacademyia.codeacademy.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private TipoUsuario role;
}
