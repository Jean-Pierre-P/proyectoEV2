import { useState, useEffect } from "react";
import axios from "axios";

export const ProductList = () => {
  const [productos, setProductos] = useState([]);

  const cargarProductos = async () => {
    // Usamos la URL base (en local será localhost:3000/productos)
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
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-6 text-teal-700">Inventario de Productos</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Nombre</th>
              <th className="p-4">Precio</th>
              <th className="p-4">Stock</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((prod) => (
              <tr key={prod.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{prod.id}</td>
                <td className="p-4 font-semibold">{prod.nombre}</td>
                <td className="p-4">${prod.precio}</td>
                <td className="p-4">{prod.stock} unidades</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};