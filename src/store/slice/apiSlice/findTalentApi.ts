/* eslint-disable @typescript-eslint/no-explicit-any */
import { mainApi } from "../mainApiSlice";

const findTalentApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getFindTalentApi: builder.query<unknown, any>({
      query: (data: any) => ({
        url: `company/find-talent`,
        method: "POST",
        body: data,
      }),
    }),
    getSingleFindTalent: builder.query<unknown, any>({
      query: (id: any) => ({
        url: `job-seeker/find/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetFindTalentApiQuery, useGetSingleFindTalentQuery } =
  findTalentApi;
