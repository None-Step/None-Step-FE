import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://nonestep.site",
  withCredentials: true,
});

export default axiosInstance