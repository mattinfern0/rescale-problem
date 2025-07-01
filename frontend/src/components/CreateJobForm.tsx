import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Paper, Stack, TextField } from "@mui/material";
import { useCreateJobMutation } from "../backendApi/mutations.ts";
import { useSnackbar } from "notistack";

const CreateJobFormSchema = z.object({
  name: z.string().min(1, "Job name is required"),
});

type CreateJobFormValues = z.infer<typeof CreateJobFormSchema>;

export const CreateJobForm = () => {
  const { handleSubmit, control, reset } = useForm<CreateJobFormValues>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(CreateJobFormSchema),
  });
  const createJobMutation = useCreateJobMutation();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = handleSubmit(
    (data) => {
      if (createJobMutation.isPending) {
        return;
      }

      createJobMutation.mutate(data, {
        onSuccess: () => {
          enqueueSnackbar("Job created", { variant: "success" });
          reset();
        },
        onError: () => {
          enqueueSnackbar("Error creating job", { variant: "error" });
        },
      });
    },
    (errors) => {
      console.error("Form submission errors:", errors);
    },
  );

  return (
    <Paper sx={{ p: "1rem" }}>
      <form onSubmit={onSubmit}>
        <Stack direction="row" spacing={3}>
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message || ""}
                label="Name"
                required
              />
            )}
          />

          <Button type="submit" variant="contained">
            Create Job
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};
