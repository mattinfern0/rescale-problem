export class ApiConnectionError extends Error {}
import { z } from "zod";

const JobStatusSchema = z.enum(["PENDING", "RUNNING", "COMPLETED", "FAILED"]);
export type JobStatus = z.infer<typeof JobStatusSchema>;

export const JobDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  current_status: JobStatusSchema,
});

export type JobDetail = z.infer<typeof JobDetailSchema>;

export const JobListSchema = z.object({
  count: z.number(),
  results: z.array(JobDetailSchema),
});

export type JobList = z.infer<typeof JobListSchema>;

export type PatchJobBody = {
  name?: string;
  status?: JobStatus;
};

export type JobListParams = {
  page?: number;
  page_size?: number;
};
