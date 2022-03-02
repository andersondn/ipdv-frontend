import { createContext, useEffect, useState } from "react";
import api from "../lib/api";
import { setLocalToken, getToken } from '../lib/authHelper';
import jwt_decode from "jwt-decode";

type LoginParams = {
  email: string;
  password: string;
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
  // signUp: (registerData: IRegisterForm) => Promise<LoginResponse>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser>();
  const [token, setToken] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [sessionExpireDate, setSessionExpireDate] = useState<Date>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const localToken = getToken();

    if (localToken) {
      setToken(localToken);
      setIsLoggedIn(true);
      console.log(jwt_decode(localToken))
      setUser(jwt_decode(localToken) as AuthUser);

    }

  }, [])

  const logIn = async (loginData: LoginParams) => {
    console.log("logIn", loginData);

    const { data } = await api
      .post("/login", loginData)
      .catch((error) => ({
        data: {
          success: false,
          message: error.message || "Erro ao tentar logar",
        },
      }));
      console.log("logIn success", data);

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

  const logOut = () => {};

  return (
    <>
      <AuthContext.Provider
        value={{
          isLoggedIn,
          // signUp,
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
