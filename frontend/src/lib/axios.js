import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true, // send cookies to the server
});

export default axiosInstance;
