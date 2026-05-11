import { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "./Modal";
import { FormCierreDespacho } from "./FormCierreDespacho";

export const TableDespachos = () => {
  const [despachos, setDespachos] = useState([]);

  const despacho = async () => {
    // CAMBIO: Apuntamos a localhost:8081 para el backend de Despachos
    try {
      const response = await axios.get("http://localhost:8081/api/v1/despachos", {
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
      });
      setDespachos(response.data);
    } catch (error) {
      console.error("Error conectando a Despachos:", error);
    }
  };

  useEffect(() => { despacho(); }, []);

  const [openModal, setOpenModal] = useState(false);
  const [despachoSeleccionado, setDespachoSeleccionado] = useState(null);

  return (
    <>
      <section className="grid text-center grid-cols-12 mb-8">
        <div className="col-span-12 flex justify-center">
          <div className="col-span-10 p-2 bg-white border border-gray-200 rounded-lg shadow h-full overflow-hidden">
            <table className="table-fixed w-full">
              <thead>
                <tr>
                  <th>Orden despacho</th>
                  <th>Dirección</th>
                  <th>Estado</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {despachos.map((d) => (
                  <tr key={d.idDespacho}>
                    <td className="py-4">{d.idDespacho}</td>
                    <td className="py-4">{d.direccionCompra}</td>
                    <td className="py-4">{d.entregado ? "Entregado" : "Pendiente"}</td>
                    <td>
                      <button onClick={() => { setDespachoSeleccionado(d); setOpenModal(true); }} className="bg-orange-200 px-4 py-1 rounded-xl">
                        Cerrar
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
        {despachoSeleccionado && (
          <FormCierreDespacho despacho={despachoSeleccionado} onClose={() => { setOpenModal(false); despacho(); }} />
        )}
      </Modal>
    </>
  );
};