import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes.tsx";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { AppErrorBoundary } from "./components/AppErrorBoundary.tsx";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { SnackbarProvider } from "notistack";

const queryClient = new QueryClient();
const router = createBrowserRouter(routes);

const theme = createTheme();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <Helmet titleTemplate="%s" defaultTitle="Job Dashboard" />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SnackbarProvider>
            <AppErrorBoundary>
              <RouterProvider router={router} />
            </AppErrorBoundary>
          </SnackbarProvider>
        </ThemeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
