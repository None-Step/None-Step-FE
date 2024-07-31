import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://nonestep.site",
  withCredentials: true, // true로 설정해줘야 cookie refreshToken 주고받을 수 있음
});

export default axiosInstance