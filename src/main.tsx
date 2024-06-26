import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { Providers } from "./components/ThemeProviders.tsx";

import "@fontsource/pacifico";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <Providers>
        <App />
      </Providers>
    </NextUIProvider>
  </React.StrictMode>,
);
