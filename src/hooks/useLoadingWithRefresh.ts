import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/slice/auth.slice";
import { apiUrl } from "@/api";

export function useLoadingWithRefresh() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchRefreshedData = async () => {
      const refreshToken = localStorage.getItem("__ux_employer_refresh_");

      if (!refreshToken) {
        if (isMounted) setLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          `${apiUrl}employer/refresh-token`,
          {
            refresh_token: refreshToken,
          },
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
            signal: controller.signal,
          }
        );

        if (response.status === 200 || response.status === 201) {
          const { accessToken, refreshToken, user } = response.data;

          sessionStorage.setItem("__ux_employer_access_", accessToken);
          localStorage.setItem("__ux_employer_refresh_", refreshToken);
          dispatch(
            setCredentials({
              access_token: accessToken,
              refresh_token: refreshToken,
              user,
            })
          );
        }

        if (isMounted) setLoading(false);
      } catch (err) {
        console.error("Error refreshing token:", err);
        localStorage.removeItem("__ux_employer_refresh_");
        sessionStorage.removeItem("__ux_employer_access_");
        window.location.href = "/";
      }
    };

    fetchRefreshedData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [dispatch]);

  return { loading };
}
