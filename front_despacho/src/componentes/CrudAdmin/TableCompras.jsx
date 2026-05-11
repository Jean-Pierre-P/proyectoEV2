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
      console.error("Error al cargar ventas:", error);
    }
  };

  useEffect(() => { compras(); }, []);

  const [openModal, setOpenModal] = useState(false);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);

  return (
    <>
      <section className="grid text-center grid-cols-12 mb-8">
        <div className="col-span-12 flex justify-center">
          <div className="col-span-10 p-4 bg-white border border-gray-200 rounded-lg shadow h-full overflow-hidden">
            <table className="table-fixed w-full">
              <thead>
                <tr className="border-b">
                  <th>ID Orden</th>
                  <th>Dirección</th>
                  <th>Fecha</th>
                  <th>Total</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {ventas.filter(v => !v.despachoGenerado).map((venta) => (
                  <tr key={venta.idVenta} className="border-b">
                    <td className="py-4">{venta.idVenta}</td>
                    <td>{venta.direccionCompra}</td>
                    <td>{venta.fechaCompra}</td>
                    <td className="font-bold">${venta.valorCompra}</td>
                    <td>
                      <button onClick={() => {setVentaSeleccionada(venta); setOpenModal(true);}} className="bg-orange-200 px-4 py-1 rounded-xl">
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
        {ventaSeleccionada && <FormDespacho venta={ventaSeleccionada} onClose={() => {setOpenModal(false); compras();}} />}
      </Modal>
    </>
  );
};