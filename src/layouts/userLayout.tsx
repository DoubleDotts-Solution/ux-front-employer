import { useIsAuthenticated } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

const UserLayout = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default UserLayout;
