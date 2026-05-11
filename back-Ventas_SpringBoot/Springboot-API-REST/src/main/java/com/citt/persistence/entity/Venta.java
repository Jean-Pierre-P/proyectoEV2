package com.citt.persistence.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Venta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idVenta;
    
    @NotBlank(message = "La dirección es obligatoria")
    private String direccionCompra;
    
    private Double valorCompra; // Usamos Double para compatibilidad
    
    @NotNull(message = "Fecha de compra es obligatoria")
    private LocalDate fechaCompra;

    @Builder.Default
    private Boolean despachoGenerado = false;
}