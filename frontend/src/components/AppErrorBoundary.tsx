import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { ApiConnectionError } from "../backendApi/types.ts";
import { Error503 } from "../pages/error/Error503.tsx";
import { Typography } from "@mui/material";
import React from "react";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";

const FallBackComponent = ({ error }: FallbackProps) => {
  if (error instanceof ApiConnectionError) {
    return <Error503 />;
  }

  return <Typography>An Unknown error Occurred</Typography>;
};

export const AppErrorBoundary = ({ children }: { children?: React.ReactNode }) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary onReset={reset} FallbackComponent={FallBackComponent}>
      {children}
    </ErrorBoundary>
  );
};
