import { useInfiniteQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";

interface ExploreFetch {
  result: Explore[];
}

export interface Explore {
  profile_url: string;
  display_name: string;
  profile_picture: string;
  cover_photo: string;
}

interface ExploreQuery {
  pageSize: number;
  type?: number;
}

const useExplores = (query: ExploreQuery) => {
  const fetchExplores = (pageParam: number) => {
    return apiClient
      .get<ExploreFetch>("/artist/explore", {
        params: {
          _start: (pageParam - 1) * query.pageSize,
          _limit: query.pageSize,
          _type: query.type,
        },
      })
      .then((res) => {
        return res.data.result;
      });
  };

  return useInfiniteQuery<Explore[], Error>({
    queryKey: ["explores", query],
    queryFn: ({ pageParam = 1 }) => fetchExplores(pageParam),
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 && lastPage.length === query.pageSize
        ? allPages.length + 1
        : undefined;
    },
  });
};

export {
  useExplores,
};
