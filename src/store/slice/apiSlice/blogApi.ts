/* eslint-disable @typescript-eslint/no-explicit-any */
import { mainApi } from "../mainApiSlice";

interface BlogFilterApiParams {
  page?: number;
  limit?: number;
  value?: string;
}

const blogApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogsApi: builder.query<unknown, BlogFilterApiParams>({
      query: (data: BlogFilterApiParams) => ({
        url: `blog`,
        method: "POST",
        body: data,
      }),
    }),
    getSingleBlogApi: builder.query<unknown, any>({
      query: (id: number) => ({
        url: `blog/find/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetBlogsApiQuery, useGetSingleBlogApiQuery } = blogApi;
