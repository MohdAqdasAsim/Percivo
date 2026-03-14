import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Home, Terms, Privacy, NotFound } from "./pages";
import { Footer, Header } from "./components";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#07090e] text-[#f0f4ff]">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/terms-of-service" element={<Terms />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
