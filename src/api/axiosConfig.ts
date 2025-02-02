import { refreshTK } from "@/store/interfaces";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASEURL,
  withCredentials: true,
});
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

instance.interceptors.response.use(
  (response) => {
    // console.log(response)
    return response;
  },
  async (err) => {
    const error = err as AxiosError;
    const originalRequest = error.config as CustomAxiosRequestConfig;

    // console.log(err.response.status)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post<refreshTK>(
          `${process.env.NEXT_PUBLIC_BASEURL}/auth/refresh`,
          {},
          {
            withCredentials: true,
          },
        );
        return instance(originalRequest);
      } catch {
        toast.error("Session expired. Please login again.");

        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    }

    return Promise.reject(error);
  },
);
export default instance;
