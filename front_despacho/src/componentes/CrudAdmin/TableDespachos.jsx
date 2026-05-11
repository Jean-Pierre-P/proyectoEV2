import { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "./Modal";
import { FormCierreDespacho } from "./FormCierreDespacho";

export const TableDespachos = () => {
  const [despachos, setDespachos] = useState([]);

  const cargarDespachos = async () => {
    const url = import.meta.env.VITE_API_DESPACHOS_URL;
    try {
      const response = await axios.get(url);
      setDespachos(response.data);
    } catch (error) {
      console.error("Error al cargar despachos:", error);
    }
  };

  useEffect(() => { cargarDespachos(); }, []);

  const [openModal, setOpenModal] = useState(false);
  const [despachoSeleccionado, setDespachoSeleccionado] = useState(null);

  return (
    <>
      <section className="grid text-center grid-cols-12 mb-8">
        <div className="col-span-12 flex justify-center">
          <div className="col-span-11 p-4 bg-white border border-gray-200 rounded-lg shadow h-full overflow-hidden">
            <table className="table-fixed w-full">
              <thead>
                <tr className="border-b">
                  <th>ID Despacho</th>
                  <th>ID Compra</th>
                  <th>Destino</th>
                  <th>Camión</th>
                  <th>Estado</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {despachos.map((d) => (
                  <tr key={d.idDespacho} className="border-b">
                    <td className="py-4">{d.idDespacho}</td>
                    <td>{d.idCompra}</td>
                    <td>{d.direccionCompra}</td>
                    <td>{d.patenteCamion}</td>
                    <td className={d.entregado ? "text-green-600" : "text-orange-500"}>
                      {d.entregado ? "Entregado" : "Pendiente"}
                    </td>
                    <td>
                      <button onClick={() => {setDespachoSeleccionado(d); setOpenModal(true);}} className="bg-orange-200 px-4 py-1 rounded-xl">
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
        {despachoSeleccionado && <FormCierreDespacho despacho={despachoSeleccionado} onClose={() => {setOpenModal(false); cargarDespachos();}} />}
      </Modal>
    </>
  );
};