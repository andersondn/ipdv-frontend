import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Users from "../pages/Users";
import CreateUser from "../pages/Users/CreateUser";
import UpdateUser from "../pages/Users/UpdateUser";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/">
      <Route  index  element={<Home />}  />
      <Route path="users">
        <Route path="edit/:userId" element={<UpdateUser />} />
        <Route path="add" element={<CreateUser />} />
        <Route index element={<Users />} />
      </Route>
      <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}
