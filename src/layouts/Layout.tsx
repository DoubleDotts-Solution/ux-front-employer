import { Navbar, Spinner } from "@/components";
import ScrollToTop from "@/components/common/scrollToTop";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";

export const Layout = () => {
  const location = useLocation();
  if (!location?.pathname.startsWith("/find-talent")) {
    localStorage.removeItem("employer_filter");
  }
  return (
    <div className="flex flex-col flex-grow">
      <ScrollToTop />
      <Navbar />
      <main className="">
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};
