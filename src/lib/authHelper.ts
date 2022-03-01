import { TOKEN_KEY } from "../helpers/constants";

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function deleteToken() {
  localStorage.removeItem(TOKEN_KEY);
}