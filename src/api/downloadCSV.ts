import axios from "axios";
import instance from "./axiosConfig";

export const downloadCSV = async () => {
    try {
      const response = await instance.get(`/admin/usercsv`, {
        withCredentials: true,
        responseType: 'blob'
      }
    );
    return response;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to delete score');
    }
  };
  