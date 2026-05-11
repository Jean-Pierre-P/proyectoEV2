package com.citt.persistence.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Despacho {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDespacho;
    private Long idCompra;
    private String direccionCompra;
    private String fechaDespacho;
    private String patenteCamion;

    @Builder.Default
    private Boolean entregado = false;

    @Builder.Default
    private Integer intento = 0;
}