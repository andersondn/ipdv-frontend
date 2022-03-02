import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/routes";
import { SWRConfig } from "swr";
import { Layout } from "antd";
import AppSlider from "./components/Slider";
import { Content, Footer } from "antd/lib/layout/layout";
import api from "./lib/api";
import { AuthProvider } from "./context/AuthContext";
import AppHeader from "./components/Header";

function App() {
  const fetcher = (url: string) => api(url).then((r) => r.data);

  return (
    <SWRConfig value={{ fetcher: fetcher }}>
      <AuthProvider>
        <BrowserRouter>
          <Layout style={{ minHeight: "100vh" }}>
            <AppSlider />
            <Layout>
              <AppHeader />
              <Content style={{ margin: "24px 16px 0" }}>
                <AppRoutes />
              </Content>
              <Footer style={{ textAlign: "center" }}>
                Sasho ©2021 Desenvolvido por Anderson Nunes{" "}
              </Footer>
            </Layout>
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </SWRConfig>
  );
}

export default App;
