import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_SERVER_URL}/api`,
  }),
  tagTypes: ["all-quiz", "all-module"],
  endpoints: () => ({}),
});
