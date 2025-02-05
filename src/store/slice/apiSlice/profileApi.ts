/* eslint-disable @typescript-eslint/no-explicit-any */
import { mainApi } from "../mainApiSlice";

const profileApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    updateProfileApi: builder.mutation<any, { data: any; id: string }>({
      query: ({ data, id }) => ({
        url: `employer/update/profile/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    updatePasswordApi: builder.mutation<any, { data: any }>({
      query: ({ data }) => ({
        url: `employer/change-password`,
        method: "POST",
        body: data,
      }),
    }),
    getDesignation: builder.query<unknown, { data: any }>({
      query: (data: any) => ({
        url: `designation`,
        method: "POST",
        body: data,
      }),
    }),
    savedCandidate: builder.query<unknown, { data: any; id: number }>({
      query: ({ data, id }) => ({
        url: `company/saved-candidates/${id}`,
        method: "POST",
        body: data,
      }),
    }),
    jobPosted: builder.query<unknown, { data: any; id: number }>({
      query: ({ data, id }) => ({
        url: `company/jobs/${id}`,
        method: "POST",
        body: data,
      }),
    }),
    singleJobData: builder.mutation<unknown, { id: number }>({
      query: ({ id }) => ({
        url: `jobs/find/${id}`,
        method: "GET",
      }),
    }),
    jobChangeStatus: builder.mutation<unknown, { id: number; data: any }>({
      query: ({ id, data }) => ({
        url: `jobs/change-job-status/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteJob: builder.mutation<unknown, { id: number }>({
      query: ({ id }) => ({
        url: `jobs/delete/${id}`,
        method: "DELETE",
      }),
    }),
    listOfJobSeeker: builder.query<unknown, { id: number }>({
      query: ({ id }) => ({
        url: `jobs/list-of-job-seeker/${id}`,
        method: "GET",
      }),
    }),
    getSkills: builder.query<unknown, { data: any }>({
      query: (data: any) => ({
        url: `skills`,
        method: "POST",
        body: data,
      }),
    }),
    verifyMobile: builder.mutation<unknown, { id: number }>({
      query: (id) => ({
        url: `employer/verify-mobile/${id}`,
        method: "GET",
      }),
    }),
    createDesignation: builder.mutation<any, { data: any }>({
      query: ({ data }) => ({
        url: `designation/create`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useUpdateProfileApiMutation,
  useUpdatePasswordApiMutation,
  useGetDesignationQuery,
  useSavedCandidateQuery,
  useJobPostedQuery,
  useSingleJobDataMutation,
  useJobChangeStatusMutation,
  useDeleteJobMutation,
  useListOfJobSeekerQuery,
  useGetSkillsQuery,
  useVerifyMobileMutation,
  useCreateDesignationMutation,
} = profileApi;
