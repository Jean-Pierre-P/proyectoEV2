import { useState, useEffect } from "react";
import { Modal } from "./Modal";
import { FormDespacho } from "./FormDespacho";
import axios from "axios";

export const TableCompras = () => {
  const [ventas, setVentas] = useState([]);

  const compras = async () => {
    const url = import.meta.env.VITE_API_VENTAS_URL;
    try {
      const response = await axios.get(url);
      setVentas(response.data);
    } catch (error) {
      console.error("Error al conectar con el servicio de ventas:", error);
    }
  };

  useEffect(() => { compras(); }, []);

  const [openModal, setOpenModal] = useState(false);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);

  return (
    <section className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-teal-700">Órdenes de Compra</h2>
      <table className="w-full text-center">
        <thead>
          <tr className="border-b">
            <th>ID</th>
            <th>Dirección</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {ventas.filter(v => !v.despachoGenerado).map((venta) => (
            <tr key={venta.idVenta} className="border-b hover:bg-gray-50">
              <td className="py-3">{venta.idVenta}</td>
              <td>{venta.direccionCompra}</td>
              <td>{venta.fechaCompra}</td>
              <td>${venta.valorCompra}</td>
              <td>
                <button onClick={() => {setVentaSeleccionada(venta); setOpenModal(true);}} className="bg-orange-200 px-4 py-1 rounded-lg">
                  Despachar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal onClose={() => setOpenModal(false)} open={openModal}>
        {ventaSeleccionada && <FormDespacho venta={ventaSeleccionada} onClose={() => {setOpenModal(false); compras();}} />}
      </Modal>
    </section>
  );
};