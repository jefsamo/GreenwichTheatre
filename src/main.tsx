import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { CartProvider } from "./context/cartContext.tsx";
import { PlayProvider } from "./context/playContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000000,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <PlayProvider>
            <App />
          </PlayProvider>
        </CartProvider>
      </QueryClientProvider>
    </MantineProvider>
  </StrictMode>
);
