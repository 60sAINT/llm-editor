import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import "./public/main.css";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("app")!);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
