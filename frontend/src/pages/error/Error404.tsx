import { Button, Container, Stack, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { Link as RouterLink } from "react-router-dom";

export const Error404 = () => {
  return (
    <Container>
      <Helmet title="Not Found" />
      <Stack spacing={3} alignItems="center">
        <Typography variant="h3">404 - Page Not Found</Typography>
        <Typography variant="body1">How did you get here anyway?</Typography>
        <Button component={RouterLink} to="/">
          Back to Site
        </Button>
      </Stack>
    </Container>
  );
};
