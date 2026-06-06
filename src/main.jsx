import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import favicon from "./public/jeroimage.png";

// Set favicon dynamically
const existingFavicon = document.querySelector("link[rel='icon']");

if (existingFavicon) {
  existingFavicon.href = favicon;
} else {
  const link = document.createElement("link");
  link.rel = "icon";
  link.href = favicon;
  document.head.appendChild(link);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);