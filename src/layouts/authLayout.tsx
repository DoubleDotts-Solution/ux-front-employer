import { useIsAuthenticated } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

const AuthLayout = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthLayout;
