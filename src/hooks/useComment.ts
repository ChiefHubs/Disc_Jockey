import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export type Comment = {
  _id: string;
  createdAt: string;
  post_id: number;
  author_id: number;
  author_name: string;
  author_avatar?: string;
  comment: string;
  deleted?: boolean;
  edited?: boolean;
};

// TODO: use this interface in the future
// interface CommentFetch {
//   comments: Comment[];
//   totalComments: number;
// }

interface CommentQuery {
  pageSize: number;
}

const useComments = (post_id: string, query: CommentQuery) => {
  const fetchComments = (pageParam: number) => {
    return axios
      .get(`${import.meta.env.VITE_COMMENTS_API}/posts/${post_id}/comments`, {
        params: {
          _start: (pageParam - 1) * query.pageSize,
          _limit: query.pageSize,
        },
      })
      .then((res) => {
        return res.data.comments;
      });
  };

  return useInfiniteQuery<Comment[], Error>({
    queryKey: ["comments", post_id],
    queryFn: ({ pageParam = 1 }) => fetchComments(pageParam),
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 && lastPage.length === 10
        ? allPages.length + 1
        : undefined;
    },
  });
};

export { useComments };
