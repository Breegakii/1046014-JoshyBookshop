import { useContext } from "react";
import authStorage from "./storage";
import AuthContext from "../context/AuthContext";
import apiClient from "../api/client";
// import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const { setUser, user } = useContext(AuthContext);
  const fetchUser = async () => await apiClient.get("/auth/users/me/");
  const logIn = async (data) => {
    try {
      authStorage.storeToken(data.access);
      const response = await fetchUser();
      console.log("response", response);

      if (response.data) {
        setUser(response.data);
        authStorage.storeUser(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setUser(null);
    authStorage.removeUser();
    authStorage.removeToken();
  };
  return { user, logIn, logOut };
};

export default useAuth;
