import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createJob, deleteJob, patchJob } from "./apiClient.ts";
import { PatchJobBody } from "./types.ts";

export const useCreateJobMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { name: string }) => createJob(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs", "list"] });
    },
  });
};

export const useDeleteJobMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (jobId: number) => deleteJob(jobId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs", "list"] });
    },
  });
};

export const usePatchJobMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (args: { jobId: number; data: PatchJobBody }) => patchJob(args.jobId, args.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
};
