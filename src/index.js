import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Use createRoot
import App from "./App";
import './style.css'
const root = ReactDOM.createRoot(document.getElementById("root")); // ✅ Fixes the issue
root.render(<App />);
