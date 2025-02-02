import instance from "./axiosConfig";

export const downloadCSV = async (): Promise<Blob> => {
  try {
    const response = await instance.get<Blob>(`/admin/usercsv`, {
      withCredentials: true,
      responseType: "blob",
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to download CSV");
    }
    throw new Error("Failed to download CSV");
  }
};
