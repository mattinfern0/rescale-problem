import { Container, Stack, Typography } from "@mui/material";
import { JobTable } from "../components/JobTable.tsx";
import { CreateJobForm } from "../components/CreateJobForm.tsx";

export const JobListPage = () => {
  return (
    <Container>
      <Stack spacing={3}>
        <Typography variant="h3">Jobs</Typography>
        <CreateJobForm />
        <JobTable />
      </Stack>
    </Container>
  );
};
