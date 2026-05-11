import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CrudAdmin } from "../componentes/CrudAdmin.jsx";
import { UserList } from "../componentes/UserList.jsx";
import { ProductList } from "../componentes/ProductList.jsx";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CrudAdmin />} />
        <Route path="/usuarios" element={<UserList />} />
        <Route path="/productos" element={<ProductList />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;