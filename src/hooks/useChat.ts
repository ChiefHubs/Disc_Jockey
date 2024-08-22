import apiClient from "../services/api-client";

const getMyDMChannels = async () => {
  return apiClient.get("/me/stream/channels").then((res) => {
    if (res?.data?.result) return res?.data?.channels;
    return [];
  });
};

export { getMyDMChannels };
