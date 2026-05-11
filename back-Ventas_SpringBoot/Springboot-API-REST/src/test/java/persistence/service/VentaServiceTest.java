package persistence.service;

import com.citt.persistence.entity.Venta;
import com.citt.persistence.repository.VentaRepository;
import com.citt.persistence.services.VentaServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.time.LocalDate;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class VentaServiceTest {
    @Mock
    private VentaRepository ventaRepository;
    @InjectMocks
    private VentaServiceImpl ventaService;
    private Venta venta;

    @BeforeEach
    public void setUp(){
        venta = Venta.builder()
                .direccionCompra("Calle Falsa 123")
                .valorCompra(1000.0) // Corregido: .0 para Double
                .fechaCompra(LocalDate.of(2025,4,14))
                .despachoGenerado(false)
                .build();
    }

    @Test
    @DisplayName("Cuando se guarda una venta válida, entonces se persiste correctamente")
    public void whenSavingValidVenta_thenItIsPersistedCorrectly(){
        when(ventaRepository.save(any(Venta.class))).thenReturn(venta);
        Venta savedVenta = ventaService.saveVenta(venta);
        verify(ventaRepository, times(1)).save(venta);
        assertNotNull(savedVenta);
        assertEquals(venta.getValorCompra(), savedVenta.getValorCompra());
    }

    @Test
    @DisplayName("Cuando se guarda una venta, entonces se asigna un ID")
    public void whenVentaIsSavedthenIdIsAssigned(){
        Venta ventaToSave = Venta.builder()
                .direccionCompra("Calle Falsa 123")
                .valorCompra(1000.0) // Corregido: .0 para Double
                .fechaCompra(LocalDate.of(2025,4,14))
                .despachoGenerado(false)
                .build();

        Venta ventaWithId = Venta.builder()
                .idVenta(1L)
                .direccionCompra("Calle Falsa 123")
                .valorCompra(1000.0) // Corregido: .0 para Double
                .fechaCompra(LocalDate.of(2025,4,14))
                .despachoGenerado(false)
                .build();

        when(ventaRepository.save(any(Venta.class))).thenReturn(ventaWithId);
        Venta result = ventaService.saveVenta(ventaToSave);
        assertEquals(1L, result.getIdVenta());
    }
}