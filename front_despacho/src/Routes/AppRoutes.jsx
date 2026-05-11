import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CrudAdmin } from "../componentes/CrudAdmin.jsx";
import { UserList } from "../componentes/UserList.jsx";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CrudAdmin />} />
        <Route path="/usuarios" element={<UserList />} />
        {/* Puedes añadir una para productos de la misma forma más adelante */}
        <Route path="/productos" element={<div className="p-10">Sección de Productos en Desarrollo</div>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;