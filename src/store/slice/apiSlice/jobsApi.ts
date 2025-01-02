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
  }),
});

export const { useCreateJobApiMutation } = jobApi;
