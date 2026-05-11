package com.citt.persistence.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ventas")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Venta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idVenta;
    private String direccionCompra;
    private Double valorCompra;
    private String fechaCompra;

    @Builder.Default
    private Boolean despachoGenerado = false;
}