/* eslint-disable @typescript-eslint/no-explicit-any */
import { mainApi } from "../mainApiSlice";

const categoryApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query<unknown, { data: any }>({
      query: (data: any) => ({
        url: `category`,
        method: "POST",
        body: data,
      }),
    }),
    getAllCompany: builder.query<
      any,
      { page: number; limit: number; value: string }
    >({
      query: (params) => ({
        url: "company",
        method: "POST",
        body: params,
      }),
    }),
  }),
});

export const { useGetCategoryQuery, useGetAllCompanyQuery } = categoryApi;
