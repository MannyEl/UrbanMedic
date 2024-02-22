import axios from "axios";

const instance = axios.create({
  baseURL: "https://randomuser.me/api/",
  method: "get",
  withCredentials: false,
  timeout: 15000,
});

export const api = instance;
