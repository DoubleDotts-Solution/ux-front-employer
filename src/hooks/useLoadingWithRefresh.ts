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
      const refreshToken = localStorage.getItem("__ux_refresh_");

      if (!refreshToken) {
        if (isMounted) setLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          `${apiUrl}job-seeker/refresh-token`,
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

        if (response.data.status) {
          const { tokens, user } = response.data.data;

          sessionStorage.setItem("__ux_access_", tokens.accessToken);
          localStorage.setItem("__ux_refresh_", tokens.refreshToken);
          dispatch(
            setCredentials({
              access_token: tokens.accessToken,
              refresh_token: tokens.refreshToken,
              user,
            })
          );
        }

        if (isMounted) setLoading(false);
      } catch (err) {
        console.error("Error refreshing token:", err);
        localStorage.removeItem("__ux_refresh_");
        sessionStorage.removeItem("__ux_access_");
        window.location.href = "/login";
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
