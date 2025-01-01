import axios, { AxiosResponse } from "axios";

export const apiUrl = import.meta.env.VITE_API_URL;
export const assetUrl = import.meta.env.VITE_ASSET_URL;

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (sessionStorage.getItem("__ux_access_")) {
    config.headers.Authorization = `Bearer ${sessionStorage.getItem(
      "__ux_access_"
    )}`;
  }
  return config;
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest.isRetry
    ) {
      originalRequest.isRetry = true;
      try {
        const { data } = await axios.post(
          `${apiUrl}/auth/refresh-token`,
          {
            refresh_token: localStorage.getItem("__ux_refresh_"),
          },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("__ux_access_")}`,
            },
          }
        );

        sessionStorage.setItem("__ux_access_", data.accessToken);
        localStorage.setItem("__ux_refresh_", data.refreshToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api.request(originalRequest);
      } catch (err) {
        console.error(err);
      }
    }
    throw error;
  }
);
export default api;

export const login = async (data: {
  email: string;
  password: string;
}): Promise<AxiosResponse> => {
  return api.post("/auth/login", data);
};

export const logout = async (): Promise<AxiosResponse> => {
  return api.get("/auth/logout");
};

export const init = async (): Promise<AxiosResponse> => {
  return api.get("/users/init");
};
