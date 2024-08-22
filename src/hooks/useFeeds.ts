import { useInfiniteQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { Audio, Image, PostVariant, Video } from "./usePosts";

interface FeedFetch {
  result: DJFeed[];
}

export interface DJFeed {
  id: number;
  profile_url: string;
  display_name: string;
  profile_picture_cache: string;
  cover_photo_cache: string;
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

export enum FeedType {
  Me = "me",
  All = "all",
  Home = "home",
}

interface FeedQuery {
  pageSize: number;
  type?: number;
  select?: FeedType;
}

const useFeeds = (query: FeedQuery) => {
  const fetchEvents = (pageParam: number) => {
    let endpoint = '/me/feed';
    if (query.select=='home'){
      endpoint='/feed';
    }
    return apiClient
      .get<FeedFetch>(endpoint, {
        params: {
          _start: (pageParam - 1) * query.pageSize,
          _limit: query.pageSize,
          _type: query.type,
          _select: query?.select ?? FeedType.All,
        },
      })
      .then((res) => {
        return res.data.result;
      });
  };

  return useInfiniteQuery<DJFeed[], Error>({
    queryKey: ["feed", query],
    queryFn: ({ pageParam = 1 }) => fetchEvents(pageParam),
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 && lastPage.length === query.pageSize
        ? allPages.length + 1
        : undefined;
    },
  });
};

const useLikePosts = async (postIds: number[]) => {
  try {
    const res = await apiClient.get(`/me/posts/likes/?postids=${postIds.join(',')}`);
    return res.data.result;
  } catch (e) {
    return [];
  }
}

const useUpdatePostState = async (postId: number) => {
  try {
    const res = await apiClient.patch(`/post/${postId}/like`);
    return res.data.result;
  } catch (e) {
    return null;
  }
}

export {
  useFeeds,
  useLikePosts,
  useUpdatePostState,
};
