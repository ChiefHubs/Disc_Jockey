import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import axios from "axios";

export enum PostVariant {
  Text = 1,
  Video = 2,
  Audio = 3,
  Images = 4,
}

interface PostFetch {
  result: Post[];
}

export interface Post {
  profile_url?: string;
  display_name?: string;
  profile_picture?: string;
  cover_photo?: string;
  id: number;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
  posttype_id: PostVariant;
  accesslevel_id: number;
  has_access: boolean;
  page?: string;
  image: Image[];
  video: Video[];
  audio: Audio[];
}

export interface Audio {
  author: string;
  sample?: string;
  location: string;
  embedded: boolean;
  artwork: string;
  title: string;
  meta_length: number;
}

export interface Video {
  location: string;
  sample?: string;
  embedded: boolean;
  poster: string;
}

export interface Image {
  location: string;
}

interface PostQuery {
  pageSize: number;
  type?: number;
}

const usePosts = (username: string, query: PostQuery) => {
  const fetchPosts = (pageParam: number) => {
    return apiClient
      .get<PostFetch>("/artist/" + username + "/posts", {
        params: {
          _start: (pageParam - 1) * query.pageSize,
          _limit: query.pageSize,
        },
      })
      .then((res) => {
        return res.data.result;
      });
  };

  return useInfiniteQuery<Post[], Error>({
    queryKey: [username, "posts", query],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam),
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 && lastPage.length === query.pageSize
        ? allPages.length + 1
        : undefined;
    },
  });
};

const usePostsForSpecialType = (username: string, query: PostQuery) => {
  const fetchTracks = (pageParam: number) => {
    return apiClient
      .get<PostFetch>("/artist/" + username + "/posts", {
        params: {
          _start: (pageParam - 1) * query.pageSize,
          _length: query.pageSize,
          _type: query.type,
        },
      })
      .then((res) => {
        return res.data.result;
      });
  };

  return useInfiniteQuery<Post[], Error>({
    queryKey: [username, "posts", query],
    queryFn: ({ pageParam = 1 }) => fetchTracks(pageParam),
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 && lastPage.length === query.pageSize
        ? allPages.length + 1
        : undefined;
    },
  });
};

const useSinglePost = (username: string, post_id: string) => {
  const getPostById = () =>
    apiClient.get("/artist/" + username + "/post/" + post_id).then((res) => {
      return res.data?.result?.[0];
    });

  return useQuery({
    queryKey: ["single", "post"],
    queryFn: () => getPostById(),
  });
};

const DJ_APP_API_CLIENT = axios.create({
  baseURL: import.meta.env.VITE_DJFAN_API_DJ_URL,
  withCredentials: true,
});

const deletePost = (post_id: number) => {
  return DJ_APP_API_CLIENT.delete<{ result: boolean }>(`/dj/post/${post_id}`);
};

export { usePosts, usePostsForSpecialType, useSinglePost, deletePost };
