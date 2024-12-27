import React from "react";
import Header from "../header";
import Main from "../main";
import { Outlet } from "react-router";
import Footer from "../footer";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </div>
  );
}
