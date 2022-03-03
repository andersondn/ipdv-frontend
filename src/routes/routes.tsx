import { Routes, Route } from "react-router-dom";
import Departments from "../pages/Departments";
import CreateDepartment from "../pages/Departments/CreateDepartment";
import UpdateDepartment from "../pages/Departments/UpdateDepartment";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Users from "../pages/Users";
import CreateUser from "../pages/Users/CreateUser";
import UpdateUser from "../pages/Users/UpdateUser";
import Costs from '../pages/Costs';
import CreateCost from '../pages/Costs/CreateCost';
import UpdateCost from '../pages/Costs/UpdateCost';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Costs />} />
        <Route path="users">
          <Route path="edit/:userId" element={<UpdateUser />} />
          <Route path="add" element={<CreateUser />} />
          <Route index element={<Users />} />
        </Route>
        <Route path="departments">
          <Route path="edit/:departmentId" element={<UpdateDepartment />} />
          <Route path="add" element={<CreateDepartment />} />
          <Route index element={<Departments />} />
        </Route>
        <Route path="costs">
          <Route path="edit/:costId" element={<UpdateCost />} />
          <Route path="add" element={<CreateCost />} />
          <Route index element={<Costs />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}
