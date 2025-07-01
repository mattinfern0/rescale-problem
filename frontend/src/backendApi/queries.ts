import { useQuery } from "@tanstack/react-query";
import { getJobList } from "./apiClient.ts";
import { JobListParams } from "./types.ts";

export const useJobListQuery = (params?: JobListParams) => {
  return useQuery({
    queryKey: ["jobs", "list", params],
    queryFn: async () => getJobList(params),
  });
};
