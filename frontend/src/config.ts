interface ConfigValues {
  apiBaseUrl: string;
}

console.log("Config loaded:", import.meta.env.VITE_BACKEND_API_BASE_URL);

export const config: ConfigValues = {
  apiBaseUrl: import.meta.env.VITE_BACKEND_API_BASE_URL || "http://localhost:8000/api",
};
