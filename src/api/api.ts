import axios from "axios";

const api = axios.create({
  baseURL: "https://eventmanagementsystemdjangoproject.onrender.com/api", // change if Django server is different
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
