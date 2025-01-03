import { mainApi } from "../mainApiSlice";

interface CreateContactApiParams {
  name: string;
  mobile_no: string;
  email: string;
  purpose: string;
  message: string;
}

const contactApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    createContactApi: builder.mutation<unknown, CreateContactApiParams>({
      query: (data) => ({
        url: `contact-us/create`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateContactApiMutation } = contactApi;
