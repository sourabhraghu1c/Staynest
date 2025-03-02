import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// import { AuthProvider } from "./context/AuthContext";


createRoot(document.getElementById("root")).render(
      
      
            <App />
      
);

// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";
// import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider

// ReactDOM.render(
//   <AuthProvider> {/* Wrap App inside AuthProvider */}
//     <App />
//   </AuthProvider>,
//   document.getElementById("root")
// );

