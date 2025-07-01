import axios from "axios";
import { config } from "../config.ts";
import { JobDetail, JobDetailSchema, JobList, JobListSchema, PatchJobBody } from "./types.ts";

const apiClient = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getJobList = async (params?: object): Promise<JobList> => {
  const response = await apiClient.get("/jobs/", { params });
  return JobListSchema.parse(response.data);
};

export const createJob = async (jobData: object): Promise<JobDetail> => {
  const response = await apiClient.post("/jobs/", jobData);
  return JobDetailSchema.parse(response.data);
};

export const deleteJob = async (jobId: number): Promise<void> => {
  await apiClient.delete(`/jobs/${jobId}/`);
};

export const patchJob = async (jobId: number, data: PatchJobBody): Promise<JobDetail> => {
  const response = await apiClient.patch(`/jobs/${jobId}/`, data);
  return JobDetailSchema.parse(response.data);
};
