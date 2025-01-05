import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import "./styles/index.css";

const render = (node: React.ReactNode) => {
  const app = document.getElementById("app");
  const queryClient = new QueryClient();

  return ReactDOM.createRoot(app!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        {node}
      </QueryClientProvider>
    </React.StrictMode>,
  );
};

export default render;