/* eslint-disable @typescript-eslint/no-explicit-any */
import { mainApi } from "../mainApiSlice";

const subscribeApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    createSubscribeApi: builder.mutation<any, any>({
      query: ({ data }) => {
        return {
          url: `newsletter/create`,
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useCreateSubscribeApiMutation } = subscribeApi;
