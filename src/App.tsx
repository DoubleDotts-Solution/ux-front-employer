import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { Spinner } from "@/components";
import { routes } from "@/routes";
import { useLoadingWithRefresh } from "@/hooks/useLoadingWithRefresh";

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
      <Toaster />
      <RouterProvider router={routes} />
    </QueryClientProvider>
  );
};
