import React from "react";
import { Outlet } from "react-router-dom";
import SearchNav from "./SearchNav";
import ScrollToTop from "./ScrollToTop";
const AppLayout = () => {
  return (
    <div className="min-h-screen bg-black text-white">
        <ScrollToTop />

      <SearchNav />
      <main className="pt-14 sm:pt-18 lg:pt-20">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
