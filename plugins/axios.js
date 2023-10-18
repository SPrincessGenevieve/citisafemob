import axios from "axios";

axios.defaults.baseURL = "http://192.168.141.171:8000/api/v1/";
axios.defaults.headers.post["Content-Type"] = "application/json";

export default axios;
