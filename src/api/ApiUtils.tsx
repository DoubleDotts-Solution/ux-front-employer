/* eslint-disable @typescript-eslint/no-explicit-any */
import { BASE_URL } from "@/config/constant";
import api from ".";

interface RegisterParams {
  name: string;
  email: string;
  password: string;
  mobile_no: string;
  company_name: string;
  website: string;
  logo: string | null;
  description: string | null;
  country: string | null;
}
interface LoginParams {
  email: string;
  password: string;
}
const ApiUtils = {
  authRegister: async function (value: RegisterParams) {
    try {
      const response = await api.post(`${BASE_URL}employer/register`, value);
      return response;
    } catch (error: any) {
      throw error.response;
    }
  },
  getLocation: async function (search: any) {
    try {
      const response = await api.get(
        `${BASE_URL}company/location-search?search=${search}`
      );

      return response;
    } catch (error: any) {
      throw error.response;
    }
  },
  authLogin: async function (value: LoginParams) {
    try {
      const response = await api.post(`${BASE_URL}employer/login`, value);
      return response;
    } catch (error: any) {
      throw error.response;
    }
  },
  getSingleUser: async function (userId: string) {
    try {
      const response = await api.get(`${BASE_URL}employer/find/${userId}`);
      return response.data;
    } catch (error: any) {
      throw error.response;
    }
  },
  verifyEmailWithTokenKey: async function ({
    token,
    key,
  }: {
    token: string;
    key: string;
  }) {
    try {
      const response = await api.get(
        `${BASE_URL}employer/verify-email/${token}/${key}`
      );
      return response;
    } catch (error: any) {
      throw error.response;
    }
  },
  changePasswordWithTokenKey: async function ({
    token,
    key,
  }: {
    token: string;
    key: string;
  }) {
    try {
      const response = await api.get(
        `${BASE_URL}employer/change-password/${token}/${key}`
      );
      return response;
    } catch (error: any) {
      throw error.response;
    }
  },
  verifyEmailWithChangePasswordTokenKey: async function ({
    token,
    key,
  }: {
    token: string;
    key: string;
  }) {
    try {
      const response = await api.get(
        `${BASE_URL}employer/change-password/${token}/${key}`
      );
      return response;
    } catch (error: any) {
      throw error.response;
    }
  },
  forgotPassword: async function (data: { email: string }) {
    try {
      const response = await api.post(
        `${BASE_URL}employer/forgot-password`,
        data
      );
      return response;
    } catch (error: any) {
      throw error.response;
    }
  },
  resetPassword: async function (data: any) {
    try {
      const response = await api.post(
        `${BASE_URL}employer/change-password`,
        data
      );
      return response;
    } catch (error: any) {
      throw error.response;
    }
  },
  authGoogleLogin: async function (data: any) {
    try {
      const response = await api.post(
        `${BASE_URL}job-seeker/google/login`,
        data
      );
      return response;
    } catch (error: any) {
      throw error.response;
    }
  },
  authGoogleResponse: async function (data: any) {
    try {
      const response = await api.post(
        `${BASE_URL}job-seeker/google/response`,
        data
      );
      return response;
    } catch (error: any) {
      throw error.response;
    }
  },
};

export default ApiUtils;
