package com.citt.persistence.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "despachos")
@Getter
@Setter
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