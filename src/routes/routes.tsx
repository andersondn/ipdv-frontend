import { Routes, Route, Outlet, useLocation, Navigate } from "react-router-dom";
import Departments from "../pages/Departments";
import CreateDepartment from "../pages/Departments/CreateDepartment";
import UpdateDepartment from "../pages/Departments/UpdateDepartment";
import Login from "../pages/Login";
import Users from "../pages/Users";
import CreateUser from "../pages/Users/CreateUser";
import UpdateUser from "../pages/Users/UpdateUser";
import Costs from "../pages/Costs";
import CreateCost from "../pages/Costs/CreateCost";
import UpdateCost from "../pages/Costs/UpdateCost";
import { Layout } from "antd";
import AppSlider from "../components/Slider";
import AppHeader from "../components/Header";
import { Content } from "antd/lib/layout/layout";
import LogOut from "../pages/Login/LogOut";
import useAuth from "../hooks/useAuth";
import SignUp from "../pages/Login/SignUp";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/">
        <Route
          element={
            <Layout style={{ minHeight: "100vh" }}>
              <AppSlider />
              <Layout>
                <AppHeader />
                <Content style={{ margin: "24px 16px 0" }}>
                  <RequireAuth>
                    <Outlet />
                  </RequireAuth>
                </Content>
              </Layout>
            </Layout>
          }
        >
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
        </Route>
        <Route
          element={
            <Layout style={{ minHeight: "100vh" }}>
              <Layout>
                <Content style={{ margin: "24px 16px 0" }}>
                  <Outlet />
                </Content>
              </Layout>
            </Layout>
          }
        >
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/logout" element={<LogOut />} />
        </Route>
      </Route>
    </Routes>
  );
}

function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (auth.isLoggedIn === false) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
