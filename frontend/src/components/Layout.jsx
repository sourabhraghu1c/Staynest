
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Layout.css"; // Import a CSS file for styling
import {ToastContainer} from "react-toastify";

const Layout = ({children }) => {
  return (
    <div className="layout">
      {/* Navbar (Sticky) */}
      <Navbar/>

      {/* Main Content */}
      <main className="main-content">{children}</main>
      <ToastContainer/>

      {/* Footer (Full Width) */}
      <Footer />
    </div>
  );
};

export default Layout;

