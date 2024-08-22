import axios from "axios";
export default axios.create({
  baseURL: import.meta.env.VITE_DJFAN_API_URL,
  headers: { "LOGGED-IN":import.meta.env.VITE_LOGGED_IN },
  withCredentials: true,
  timeout: 5000,
});
