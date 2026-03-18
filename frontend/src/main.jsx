import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import "./utils/i18n";

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#14b8a6" },
    secondary: { main: "#f59e0b" },
    background: {
      default: "#020617",
      paper: "rgba(15, 23, 42, 0.85)"
    }
  },
  shape: {
    borderRadius: 16
  }
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
