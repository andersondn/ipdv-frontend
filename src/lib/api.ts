import axios from "axios";
import { BACKEND_URL } from "../helpers/constants";

const api = axios.create({
  baseURL: BACKEND_URL
});


export default api