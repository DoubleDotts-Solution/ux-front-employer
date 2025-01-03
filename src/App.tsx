import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { Spinner } from "@/components";
import { routes } from "@/routes";
import { useLoadingWithRefresh } from "@/hooks/useLoadingWithRefresh";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "./config/constant";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export const AppLoader = () => {
  const { loading } = useLoadingWithRefresh();

  if (loading) {
    return <Spinner />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <Toaster />
        <RouterProvider router={routes} />
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
};
