package br.com.codeacademyia.codeacademy.controller;

import br.com.codeacademyia.codeacademy.model.Atividade;
import br.com.codeacademyia.codeacademy.model.Aula;
import br.com.codeacademyia.codeacademy.model.DTO.AtividadeDTO;
import br.com.codeacademyia.codeacademy.model.DTO.AulaDTO;
import br.com.codeacademyia.codeacademy.service.AtividadeService;
import br.com.codeacademyia.codeacademy.service.AulaService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/aulas")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AulaController {

    private final AulaService service;

    @PostMapping
    public ResponseEntity<AulaDTO> add(
            @RequestPart("aula") String aulaJson,
            @RequestPart("file") MultipartFile file) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            mapper.registerModule(new JavaTimeModule());
            AulaDTO dto = mapper.readValue(aulaJson, AulaDTO.class);

            // Pasta de uploads relativa à raiz do projeto (ou onde o Spring Boot roda)
            String pastaUploads = System.getProperty("user.dir") + "/uploads";
            File dir = new File(pastaUploads);
            if (!dir.exists()) {
                dir.mkdirs();
            }


            String originalName = file.getOriginalFilename();
            String safeName = java.text.Normalizer.normalize(originalName, java.text.Normalizer.Form.NFD)
                    .replaceAll("[^\\p{ASCII}]", "")
                    .replaceAll(" ", "_"); // opcional

            // Caminho físico para salvar o arquivo
            File destino = new File(dir, safeName);
            file.transferTo(destino);
            dto.setCaminho(safeName); // salva apenas o nome, para usar no front


            // Salva no DTO **apenas o nome do arquivo ou caminho relativo**
            dto.setCaminho(file.getOriginalFilename()); // só o nome do arquivo

            AulaDTO salvo = service.add(dto);

            return ResponseEntity.ok(salvo);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build(); // mantém AtividadeDTO como vazio
        }


    }



    @GetMapping("/minhasAulas")
    public ResponseEntity<List<Aula>> getAulasDaTurma(@RequestHeader UUID idTurma){
        return ResponseEntity.ok(service.getTodasAsAtividadesDaTurma(idTurma));
    }
}
