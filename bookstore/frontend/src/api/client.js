import axios from "axios";
import authStorage from "../auth/storage";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

const baseUrl = "http://localhost:8000";

const apiClient = axios.create({
  baseURL: baseUrl,
});

apiClient.interceptors.request.use(async (request) => {
  const authToken = authStorage.getToken();
  const refreshToken = authStorage.getRefreshToken();
  if (!authToken) return request;
  request.headers.Authorization = `JWT ${authToken}`;
  const user = jwtDecode(authToken);
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

  if (!isExpired) return request;
  try {
    const res = await axios.post(`${baseUrl}/auth/jwt/refresh/`, {
      refresh: refreshToken,
    });

    if (res.status === 200) {
      localStorage.setItem("access", JSON.stringify(res.data.access));
      request.headers.Authorization = `JWT ${res.data.access}`;
    }
  } catch (error) {
    console.log("Token refresh failed:", error);
    authStorage.removeToken();
    authStorage.removeRefreshToken();
    authStorage.removeUser();

    window.location.href = "/login";
  }
  return request;
});

export default apiClient;