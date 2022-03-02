import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./lib/routes";
import { SWRConfig } from "swr";
import { Layout } from "antd";
import AppSlider from "./components/Slider";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import api from "./lib/api";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const fetcher = (url: string) => api(url).then((r) => r.data);

  return (
    <SWRConfig value={{ fetcher: fetcher }}>
      <AuthProvider>
        <BrowserRouter>
          <Layout style={{ minHeight: "100vh" }}>
            <AppSlider />
            <Layout>
              <Header
                className="site-layout-sub-header-background"
                style={{ padding: 0 }}
              />
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
