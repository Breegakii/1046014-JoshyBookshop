import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { CartContextProvider } from "./context/CartContextProvider.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
import AuthContextProvider from "./context/AuthContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <CartContextProvider>
        <RouterProvider router={router} />
      </CartContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
