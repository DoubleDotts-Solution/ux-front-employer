import { AuthState } from "@/store/slice/auth.slice";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export const useAuth = () => {
  return useSelector<RootState, AuthState>((state) => state.auth);
};

export const useIsAuthenticated = () => {
  return Boolean(sessionStorage.getItem("__ux_access_"));
};
