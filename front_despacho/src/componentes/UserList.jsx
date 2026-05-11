import { useState, useEffect } from "react";
import Navbar from "./Layouts/Navbar";

export const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/usuarios") // URL de tu json-server
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div className="grid grid-cols-[auto_1fr] min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Gestión de Usuarios</h1>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Nombre</th>
              <th className="border px-4 py-2">Rol</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td className="border px-4 py-2">{u.id}</td>
                <td className="border px-4 py-2">{u.nombre}</td>
                <td className="border px-4 py-2">{u.rol}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};