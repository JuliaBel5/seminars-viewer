import { StrictMode } from "react";
import { MantineProvider } from "@mantine/core";
import { createRoot } from "react-dom/client";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "./index.scss";
import App from "./App.tsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      <App />
      <ToastContainer />
    </MantineProvider>
  </StrictMode>
);
