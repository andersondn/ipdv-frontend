import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/routes";
import { SWRConfig } from "swr";
import api from "./lib/api";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const fetcher = (url: string) => api(url).then((r) => r.data);

  return (
    <SWRConfig value={{ fetcher: fetcher }}>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </SWRConfig>
  );
}

export default App;
