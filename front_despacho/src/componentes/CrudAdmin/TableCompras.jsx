import { useState, useEffect } from "react";
import { Modal } from "./Modal";
import { FormDespacho } from "./FormDespacho";
import axios from "axios";

export const TableCompras = () => {
  const [ventas, setVentas] = useState([]);

  const compras = async () => {
    // CAMBIO: Apuntamos a localhost:8080 para el backend de Ventas
    try {
      const response = await axios.get("http://localhost:8080/api/v1/ventas", {
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
      });
      setVentas(response.data);
    } catch (error) {
      console.error("Error conectando a Ventas:", error);
    }
  };

  useEffect(() => { compras(); }, []);

  const [openModal, setOpenModal] = useState(false);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
  
  const handleAbrirModal = (venta) => {
    setVentaSeleccionada(venta);
    setOpenModal(true);
  };

  return (
    <>
      <section className="grid text-center grid-cols-12 mb-8">
        <div className="col-span-12 flex justify-center">
          <div className="col-span-10 p-2 bg-white border border-gray-200 rounded-lg shadow h-full overflow-hidden">
            <table className="table-fixed w-full">
              <thead>
                <tr>
                  <th>Orden de compra</th>
                  <th>Dirección</th>
                  <th>Fecha</th>
                  <th>Valor Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {ventas.filter(v => !v.despachoGenerado).map((venta) => (
                  <tr key={venta.idVenta}>
                    <td className="py-4">{venta.idVenta}</td>
                    <td className="py-4">{venta.direccionCompra}</td>
                    <td className="py-4">{venta.fechaCompra}</td>
                    <td className="py-4">${venta.valorCompra}</td>
                    <td>
                      <button onClick={() => handleAbrirModal(venta)} className="bg-orange-200 px-4 py-1 rounded-xl">
                        Generar Despacho
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <Modal onClose={() => setOpenModal(false)} open={openModal}>
        {ventaSeleccionada && (
          <FormDespacho venta={ventaSeleccionada} onClose={() => { setOpenModal(false); compras(); }} />
        )}
      </Modal>
    </>
  );
};