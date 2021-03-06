import { createContext, useEffect, useState } from "react";
import api from "../lib/api";
import { setLocalToken, getToken, deleteToken } from "../lib/authHelper";
import jwt_decode from "jwt-decode";

type LoginParams = {
  email: string;
  password: string;
};

type SignUpParams = {
  email: string;
  password: string;
  name: string;
};
type LoginResponse = {
  success: boolean;
  message?: string;
};

type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
};

type AuthContextType = {
  user?: AuthUser;
  token?: string;
  isLoggedIn: boolean;
  sessionExpireDate?: Date;
  logIn: (loginData: LoginParams) => Promise<LoginResponse>;
  logOut: () => void;
  signUp: (loginData: SignUpParams) => Promise<LoginResponse>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser>();
  const [token, setToken] = useState<string>();
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const localToken = getToken();

    if (localToken) {
      setToken(localToken);
      setIsLoggedIn(true);
      setUser(jwt_decode(localToken) as AuthUser);
      return;
    }
    setIsLoggedIn(false);
  }, []);

  const logIn = async (loginData: LoginParams) => {
    const { data } = await api.post("/login", loginData).catch((error) => ({
      data: {
        success: false,
        message: error.message || "Erro ao tentar logar",
      },
    }));

    if (data.token) {
      setToken(data.token);
      setIsLoggedIn(true);
      setLocalToken(data.token);
      setUser(jwt_decode(data.token) as AuthUser);

      return {
        success: true,
      };
    }

    return {
      success: false,
      message: data.message,
    };
  };

  const signUp = async (loginData: LoginParams) => {
    const { data } = await api.post("/login/signUp", loginData).catch((error) => ({
      data: {
        success: false,
        message: error.message || "Erro ao tentar criar conta",
      },
    }));

    if (data.id) {
      return {
        success: true,
      };
    }

    return {
      success: false,
      message: data.message,
    };
  };

  const logOut = () => {
    deleteToken();
  };

  return (
    <>
      <AuthContext.Provider
        value={{
          isLoggedIn,
          signUp,
          token,
          user,
          logOut,
          logIn,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}
