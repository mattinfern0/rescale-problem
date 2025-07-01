import {
  Alert,
  FormControl,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useJobListQuery } from "../backendApi/queries.ts";
import { JobDetail, JobStatus } from "../backendApi/types.ts";
import { useDeleteJobMutation, usePatchJobMutation } from "../backendApi/mutations.ts";
import { useSnackbar } from "notistack";
import { MuiTablePaginationActions } from "./MuiTablePaginationActions.tsx";
import React, { useState } from "react";

const EmptyBodyContent = () => {
  return (
    <TableRow>
      <TableCell colSpan={3} align="center">
        No jobs found.
      </TableCell>
    </TableRow>
  );
};

const JobTableRow = (props: { job: JobDetail }) => {
  const { job } = props;
  const deleteJobMutation = useDeleteJobMutation();
  const patchJobMutation = usePatchJobMutation();
  const { enqueueSnackbar } = useSnackbar();

  const onDeleteClick = () => {
    if (deleteJobMutation.isPending) {
      return;
    }

    deleteJobMutation.mutate(job.id, {
      onSuccess: () => {
        enqueueSnackbar({ message: "Job deleted", variant: "success" });
      },
      onError: () => {
        enqueueSnackbar({ message: "Error deleting job", variant: "error" });
      },
    });
  };

  const statusChange = (val: string) => {
    if (patchJobMutation.isPending) {
      return;
    }

    console.debug("Changing job status to:", val);

    patchJobMutation.mutate(
      {
        jobId: job.id,
        data: { status: val as JobStatus },
      },
      {
        onError: () => {
          enqueueSnackbar({ message: "Error updating job status", variant: "error" });
        },
      },
    );
  };

  return (
    <TableRow>
      <TableCell>{job.id}</TableCell>
      <TableCell>{job.name}</TableCell>
      <TableCell>
        <FormControl fullWidth>
          <Select
            value={job.current_status}
            onChange={(e) => statusChange(e.target.value)}
            displayEmpty
            name={`${job.id}.status`}
          >
            <MenuItem value="PENDING">Pending</MenuItem>
            <MenuItem value="RUNNING">Running</MenuItem>
            <MenuItem value="COMPLETED">Completed</MenuItem>
            <MenuItem value="FAILED">Failed</MenuItem>
          </Select>
        </FormControl>
      </TableCell>
      <TableCell>
        <Stack direction="row-reverse">
          <IconButton onClick={onDeleteClick} aria-label={`delete job ${job.name}`}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      </TableCell>
    </TableRow>
  );
};

const LoadingPlaceholder = () => {
  const numRows = 5;

  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(<Skeleton variant="rectangular" width="100%" height={50} key={i} />);
  }

  return rows;
};

export const JobTable = () => {
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const jobListQuery = useJobListQuery({
    page: page + 1, // API uses 1-based indexing for pages
    page_size: pageSize,
  });

  if (jobListQuery.isPending) {
    return <LoadingPlaceholder />;
  }

  if (jobListQuery.isError) {
    return <Alert severity="error">Unable to load jobs</Alert>;
  }

  const rows = jobListQuery.data?.results.map((job) => <JobTableRow key={job.id} job={job} />) || [];
  const totalCount = jobListQuery.data?.count || 0;

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length === 0 && <EmptyBodyContent />}
          {rows.length > 0 && rows}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={3}
              count={totalCount}
              rowsPerPage={pageSize}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={MuiTablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};
