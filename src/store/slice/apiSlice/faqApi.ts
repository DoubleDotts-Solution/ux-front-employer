import { mainApi } from "../mainApiSlice";

interface FaqApiParams {
  page?: number;
  limit?: number;
  value?: string;
}

const faqApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getFaqsApi: builder.query<unknown, FaqApiParams>({
      query: (data: FaqApiParams) => ({
        url: `faq`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

// Export the hook for usage in components
export const { useGetFaqsApiQuery } = faqApi;
