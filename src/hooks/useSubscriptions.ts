import { useInfiniteQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";

interface SubscriptionListFetch {
    result: Subscription[];
  }

export enum StatusIdVariant {
    New = 1,
    Failed = 3,
    Cancelled = 7,
    Active = 9,
}

export interface Subscription {
    id: number;
    user_id: number;
    user_key: string;
    dj_user_id: number;
    period_start: string;
    period_end: string;
    subscription: string;
    customer: string;
    mount: number;
    accesslevel: number;
    description: string;
    product: number;
    status_id: StatusIdVariant;
    sku?: string;
    image_url?: string;  
    created_at: string;
    updated_at: string;
} 

interface SubscriptionQuery {
    pageSize: number;
    type?: number;
}
  
const useSubscriptions = (query: SubscriptionQuery) => {
    const fetchSubscriptions = (pageParam: number) => {
      return apiClient
        .get<SubscriptionListFetch>("/me/subscriptions", {
          params: {
            _start: (pageParam - 1) * query.pageSize,
            _limit: query.pageSize,
          },
        })
        .then((res) => {
          return res.data.result;
        });
    };
  
    return useInfiniteQuery<Subscription[], Error>({
      queryKey: ["subscriptions", query],
      queryFn: ({ pageParam = 1 }) => fetchSubscriptions(pageParam),
      keepPreviousData: true,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length > 0 && lastPage.length === query.pageSize
          ? allPages.length + 1
          : undefined;
      },
    });
};

export { useSubscriptions };