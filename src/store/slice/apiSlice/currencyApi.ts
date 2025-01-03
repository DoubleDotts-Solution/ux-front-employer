/* eslint-disable @typescript-eslint/no-explicit-any */
import { mainApi } from "../mainApiSlice";

const currencyApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getCurrency: builder.query<unknown, { data: any }>({
      query: (data: any) => ({
        url: `currency`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetCurrencyQuery } = currencyApi;
