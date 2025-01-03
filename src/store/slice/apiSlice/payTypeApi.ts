/* eslint-disable @typescript-eslint/no-explicit-any */
import { mainApi } from "../mainApiSlice";

const payTypeApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getPayType: builder.query<unknown, { data: any }>({
      query: (data: any) => ({
        url: `pay-type`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetPayTypeQuery } = payTypeApi;
