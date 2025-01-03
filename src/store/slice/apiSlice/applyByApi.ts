/* eslint-disable @typescript-eslint/no-explicit-any */
import { mainApi } from "../mainApiSlice";

const applyByApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getApplyBy: builder.query<unknown, { data: any }>({
      query: (data: any) => ({
        url: `apply-by`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetApplyByQuery } = applyByApi;
