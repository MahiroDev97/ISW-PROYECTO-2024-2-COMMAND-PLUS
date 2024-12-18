import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const API_URL = "http://127.0.0.1:3000/api";

const useUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() =>
    JSON.parse(sessionStorage.getItem("usuario"))
  );

  const fetchUser = async () => {
    const userData = JSON.parse(sessionStorage.getItem("usuario"));

    if (userData) {
      try {
        const token = Cookies.get("jwt-auth");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `${API_URL}/user/detail/?id=${userData.id}`,
          config
        );
        const updatedUser = response.data.data;
        setUser(updatedUser);
        sessionStorage.setItem("usuario", JSON.stringify(updatedUser));
        console.log("updatedUser useUser", updatedUser);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return user;
};

export default useUser;
