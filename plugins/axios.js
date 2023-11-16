import axios from "axios";

axios.defaults.baseURL = "http://192.168.0.16:8000/api/v1/";
axios.defaults.headers.post["Content-Type"] = "application/json";

export default axios;
// import axios from "axios";

// axios.defaults.baseURL = "https://jaydemike.pythonanywhere.com/api/v1/";
// axios.defaults.headers.post["Content-Type"] = "application/json";

// export default axios;
