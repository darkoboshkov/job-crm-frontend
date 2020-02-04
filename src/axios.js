import axios from "axios";
import store from "./store";

const API_URL = process.env.VUE_APP_API_URL;

let bearHeader = "";
const token = store.state.token.jwt;
if (token) {
  bearHeader = "Bearer " + token;
}

export default axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: bearHeader
  }
});
