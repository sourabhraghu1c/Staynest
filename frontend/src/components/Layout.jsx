import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Layout.css";
import {ToastContainer} from "react-toastify";

const Layout = ({children }) => {
  return (
    <div className="layout">
      <Navbar/>
      <main className="main-content">{children}</main>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover={false}
        draggable
        toastStyle={{ marginTop: "70px" }}
      />
      <Footer />
    </div>
  );
};

export default Layout;

