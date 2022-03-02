import { Routes, Route,} from "react-router-dom";
import Home from "../pages/Home";
import Users from "../pages/Users";
import Login from '../pages/Login';
import CreateUser from "../pages/Users/CreateUser";

export default function AppRoutes(){

    return(
        <Routes>

            <Route path="/"  element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/add" element={<CreateUser />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/users/:id" component={User} />
            <Route path="/users/:id/edit" component={UserEdit} /> */}
        </Routes>
    )
}