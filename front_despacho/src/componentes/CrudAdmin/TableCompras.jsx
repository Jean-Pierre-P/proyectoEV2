import { useState, useEffect } from "react";
import { Modal } from "./Modal";
import { FormDespacho } from "./FormDespacho";
import axios from "axios";

export const TableCompras = () => {
  const [ventas, setVentas] = useState([]);

  const compras = async () => {
    // Usamos la variable de entorno para flexibilidad total
    const url = import.meta.env.VITE_API_VENTAS_URL;
    
    try {
      await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then((response) => {
        setVentas(response.data);
      });
    } catch (error) {
      console.error("Error al conectar con el servicio de ventas:", error);
    }
  };

  useEffect(() => {
    compras();
  }, []);

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
          <div className="col-span-10 p-4 bg-white border border-gray-200 rounded-lg shadow h-full overflow-hidden">
            <h2 className="text-xl font-bold mb-4 text-teal-700">Órdenes de Compra Pendientes</h2>
            <table className="table-fixed w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-4">ID Orden</th>
                  <th className="py-4">Dirección</th>
                  <th className="py-4">Fecha</th>
                  <th className="py-4">Total</th>
                  <th className="py-4">Acción</th>
                </tr>
              </thead>
              <tbody>
                {ventas
                  .filter((venta) => !venta.despachoGenerado)
                  .map((venta) => (
                    <tr key={venta.idVenta} className="border-b hover:bg-gray-50">
                      <td className="py-4">{venta.idVenta}</td>
                      <td className="py-4 text-sm">{venta.direccionCompra}</td>
                      <td className="py-4">{venta.fechaCompra}</td>
                      <td className="py-4 font-bold">${venta.valorCompra}</td>
                      <td>
                        <button
                          onClick={() => handleAbrirModal(venta)}
                          className="py-2 bg-orange-200 px-4 rounded-xl shadow-md hover:bg-orange-300 transition-all duration-300"
                        >
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
          <FormDespacho
            venta={ventaSeleccionada}
            onClose={() => {
              setOpenModal(false);
              compras();
            }}
          />
        )}
      </Modal>
    </>
  );
};