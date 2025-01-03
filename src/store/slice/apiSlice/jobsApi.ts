/* eslint-disable @typescript-eslint/no-explicit-any */
import { mainApi } from "../mainApiSlice";

const jobApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    createJobApi: builder.mutation<any, { data: any }>({
      query: ({ data }) => ({
        url: `jobs/create`,
        method: "POST",
        body: data,
      }),
    }),
    updateJobApi: builder.mutation<any, { data: any; id: number }>({
      query: ({ data, id }) => ({
        url: `jobs/update/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    getJobType: builder.query<unknown, { data: any }>({
      query: (data: any) => ({
        url: `job-type`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateJobApiMutation,
  useGetJobTypeQuery,
  useUpdateJobApiMutation,
} = jobApi;
