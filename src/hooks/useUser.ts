import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";

interface UserFetch {
  result: User;
}

export interface User {
  user_id: number;
  user_key: string;
  roles: Array<string>;
  first_name: string;
  last_name: string;
  username: string;
  display_name: string;
  email: string;
  avatar: string;
  admin?: boolean;
  partner?: boolean;
  dj?: boolean;
}

interface UserListFetch {
  result: DJUser[];
}

export interface DJUser {
  user_id: number;
  profile_url: string;
  display_name: string;
  profile_picture: string;
  cover_photo: string;
  genre: string;
  location: string;
  country: string;
}

export interface IConnectedUser {
  accesslevel_id: number;
  cover_photo: string;
  display_name: string;
  profile_url: string;
  profile_picture: string;
}

export interface Connection {
  user_id: number;
  accesslevel_id: number;
  name: string;
  primary_image: string;
  secondary_image: string;
  type: number;
  url: string;
}

interface ConnectionFetch {
  result: boolean;
  data: Connection[];
}

const useUser = () => {
  const fetchUser = () =>
    apiClient.get<UserFetch>("/me").then((res) => {
      return res.data.result;
    });

  return useQuery<User, Error>({
    queryKey: ["user", "me"],
    queryFn: () => fetchUser(),
  });
};

const useUserCheck = (username: string) => {
  const checkUser = () =>
    apiClient
      .get<{ result: boolean }>(`/usercheck?username=${username}`)
      .then((res) => {
        return res.data.result;
      });

  return useQuery({
    queryKey: ["user", "check"],
    queryFn: () => checkUser(),
  });
};

const useUserEmailChange = () => {
  apiClient.get("/me/change_email");
};

const useUserPasswordReset = () => {
  apiClient.get("/me/reset_password");
};

const useUserNameChange = async (username: string) => {
  await apiClient.post("/me/username", { username });
};

const useEmailChange = async (email: string, hash_key: string) => {
  const res = await apiClient.post("/me/change_email", { email, hash_key });
  return res.data;
};

const useResetPassword = async (password: string, hash_key: string) => {
  const res = await apiClient.post("/me/reset_password", {
    password,
    hash_key,
  });
  return res.data;
};

const useUserList = async (search: string) => {
  const res = await apiClient.get<UserListFetch>(
    `/search?type=artist&query=${search}`
  );
  return res.data.result;
};

const useUserConnectionCheck = () => {
  const checkConnection = () =>
    apiClient.get<{ result: any }>("/me/connections").then((res) => {
      return res.data.result;
    });

  return useQuery({
    queryKey: ["me", "connection"],
    queryFn: () => checkConnection(),
  });
};

const useMyConnections = () => {
  const myConnection = () =>
    apiClient.get<ConnectionFetch>("/me/myconnections").then((res) => {
      if (!res.data.result){
        return [];
      }
      return res.data.data;
    });
  return useQuery({
    queryKey: ["me", "myconnections"],
    queryFn: () => myConnection(),
  });
};

const useUserConnection = async (username: string) => {
  const res = await apiClient.patch("/artist/" + username + "/connect");
  return res.data;
};

const updateUserNames = async (
  firstName: string,
  lastName: string,
  displayName: string,
) => {
  return await apiClient.post("/me", {
    first_name: firstName,
    last_name: lastName,
    display_name: displayName,
  });
};

const updateUserFirstNameLastName = async (
  firstName: string,
  lastName: string
) => {
  return await apiClient.post("/me", {
    first_name: firstName,
    last_name: lastName,
  });
};

const getUserChatToken = async () => {
  return apiClient.get("/me/stream/token").then((res) => {
    if (res?.data?.result) return res?.data?.token;
    return "";
  });
};

const useUserChatToken = () => {
  return useQuery({
    queryKey: ["userChatToken"],
    queryFn: () => getUserChatToken(),
  });
};

export {
  useResetPassword,
  useUser,
  useUserCheck,
  useEmailChange,
  useUserEmailChange,
  useUserNameChange,
  useUserPasswordReset,
  useUserList,
  useUserConnection,
  useUserConnectionCheck,
  updateUserFirstNameLastName,
  updateUserNames,
  useUserChatToken,
  useMyConnections,
};
