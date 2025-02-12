import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { StarChartProvider } from "./providers/StarChartProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <StarChartProvider>
      <App />
    </StarChartProvider>
  </React.StrictMode>,
);
