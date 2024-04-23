import axios from "axios";

// Set base url to server on which backend is running
const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

export default API;
