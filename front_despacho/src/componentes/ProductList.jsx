import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Layouts/Navbar";
import Footer from "./Layouts/Footer"; 

export const ProductList = () => {
  const [productos, setProductos] = useState([]);

  const cargarProductos = async () => {
    const url = import.meta.env.VITE_API_VENTAS_URL.replace("/ventas", "/productos");
    try {
      const response = await axios.get(url);
      setProductos(response.data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

  useEffect(() => { cargarProductos(); }, []);

  return (
    <div className="grid grid-cols-[auto_1fr] min-h-screen bg-gray-50">
      {/* Columna 1: Navbar lateral */}
      <div className="col-span-1">
        <Navbar />
      </div>

      {/* Columna 2: Contenido de Productos */}
      <div className="overflow-y-auto p-6">
        <h2 className="text-2xl font-bold mb-6 text-teal-700">Inventario de Productos</h2>
        <div className="bg-white rounded-lg shadow-lg p-6 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b bg-teal-50">
                <th className="p-4">ID</th>
                <th className="p-4">Nombre</th>
                <th className="p-4">Precio</th>
                <th className="p-4">Stock</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((prod) => (
                <tr key={prod.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-4">{prod.id}</td>
                  <td className="p-4 font-bold">{prod.nombre}</td>
                  <td className="p-4">${prod.precio}</td>
                  <td className="p-4">{prod.stock} unidades</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Footer />
      </div>
    </div>
  );
};