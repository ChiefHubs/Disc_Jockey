import { AxiosProgressEvent } from "axios";
import apiClient from "../services/api-client";

const getSupportToken = async () => {
  const res = await apiClient.get("/support/token");
  return res.data.token;
};

const uploadFile = async (
  file: File,
  token: string,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
) => {
  const config = {
    onUploadProgress,
  };

  const fData = new FormData();
  fData.append("file", file);
  return await apiClient.post(`/support/${token}/upload`, fData, config);
};

const deleteFile = async (token: string, filename: string) => {
  const res = await apiClient.delete(`/support/${token}/upload`, {
    data: { filename },
  });

  return res.data;
};

const createSupportTicket = async (
  token: string,
  data: {
    user_type: string;
    full_name: string;
    email: string;
    subject: string;
    description: string;
    recaptcha: string;
  }
) => {
  const res = await apiClient.post(`/support/${token}`, data);
  return res.data;
};

export { getSupportToken, uploadFile, deleteFile, createSupportTicket };
