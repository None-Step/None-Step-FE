import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://nonstep.site",
    withCredentials: true,
});

export default axiosInstance;