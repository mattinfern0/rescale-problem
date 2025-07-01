import { RouteObject } from "react-router-dom";
import { Error404 } from "./pages/error/Error404.tsx";
import { JobListPage } from "./pages/JobListPage.tsx";
import { AppErrorBoundary } from "./components/AppErrorBoundary.tsx";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <AppErrorBoundary>
          <JobListPage />
      </AppErrorBoundary>
    ),
  },
  {
    path: "*",
    element: <Error404 />,
  },
];
