import { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "./Modal";
import { FormCierreDespacho } from "./FormCierreDespacho";

export const TableDespachos = () => {
  const [despachos, setDespachos] = useState([]);

  const cargarDespachos = async () => {
    // Usamos la variable de entorno para evitar fallos en AWS
    const url = import.meta.env.VITE_API_DESPACHOS_URL;
    
    try {
      await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then((response) => {
        setDespachos(response.data);
      });
    } catch (error) {
      console.error("Error al conectar con el servicio de despachos:", error);
    }
  };

  useEffect(() => {
    cargarDespachos();
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const [despachoSeleccionado, setDespachoSeleccionado] = useState(null);

  const handleAbrirModal = (despacho) => {
    setDespachoSeleccionado(despacho);
    setOpenModal(true);
  };

  return (
    <>
      <section className="grid text-center grid-cols-12 mb-8">
        <div className="col-span-12 flex justify-center">
          <div className="col-span-11 p-4 bg-white border border-gray-200 rounded-lg shadow h-full overflow-hidden">
            <h2 className="text-xl font-bold mb-4 text-teal-700">Consultas de Despachos</h2>
            <table className="table-fixed w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-4">ID Despacho</th>
                  <th className="py-4">ID Compra</th>
                  <th className="py-4">Destino</th>
                  <th className="py-4">Fecha</th>
                  <th className="py-4">Camión</th>
                  <th className="py-4">Estado</th>
                  <th className="py-4">Acción</th>
                </tr>
              </thead>
              <tbody>
                {despachos.map((despacho) => (
                  <tr key={despacho.idDespacho} className="border-b hover:bg-gray-50">
                    <td className="py-4">{despacho.idDespacho}</td>
                    <td className="py-4">{despacho.idCompra}</td>
                    <td className="py-4">{despacho.direccionCompra}</td>
                    <td className="py-4">{despacho.fechaDespacho}</td>
                    <td className="py-4">{despacho.patenteCamion}</td>
                    <td className="py-4">
                      {despacho.entregado ? (
                        <span className="text-green-600 font-bold">Entregado</span>
                      ) : (
                        <span className="text-orange-500 font-bold">Pendiente</span>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => handleAbrirModal(despacho)}
                        className="py-1 bg-orange-200 px-4 rounded-xl shadow hover:bg-orange-300 transition-all"
                      >
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
          <FormCierreDespacho
            despacho={despachoSeleccionado}
            onClose={() => {
              setOpenModal(false);
              cargarDespachos();
            }}
          />
        )}
      </Modal>
    </>
  );
};