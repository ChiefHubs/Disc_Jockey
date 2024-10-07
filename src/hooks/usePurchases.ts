import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";

export enum StatusIdVariant {
  New = 1,
  Failed = 3,
  Cancelled = 7,
  Active = 9,
}

interface PurchasesListFetch {
  result: Purchase[];
}

export enum PurchaseProductType {
  AUDIO = "audio",
}

export interface Purchase {
  id: number;
  user_id: number;
  user_key: string;
  dj_user_id: number;
  product: number;
  status_id: number;
  amount: number;
  description: string;
  customer: string;
  invoice: string;
  sku?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
  product_type: PurchaseProductType;
  release_date?: string;
  label?: string;
  credits?: string;
  purchased_date: string;
  product_name?: string;
  author_name?: string;
}

interface PurchasesQuery {
  pageSize: number;
  type?: number;
}

const usePurchases = (query: PurchasesQuery) => {
  const fetchPurchases = (pageParam: number) => {
    return apiClient
      .get<PurchasesListFetch>("/me/purchases", {
        params: {
          _start: (pageParam - 1) * query.pageSize,
          _limit: query.pageSize,
        },
      })
      .then((res) => {
        return res.data.result;
      });
  };

  return useInfiniteQuery<Purchase[], Error>({
    queryKey: ["purchase", query],
    queryFn: ({ pageParam = 1 }) => fetchPurchases(pageParam),
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 && lastPage.length === query.pageSize
        ? allPages.length + 1
        : undefined;
    },
  });
};

const getMyPurchases = (query: { page: number; pageSize: number }) => {
  const fetchSubscriptionDetails = () =>
    apiClient.get("/me/purchases").then((res) => {
      return res.data.result;
    });

  return useQuery<Purchase[], Error>({
    queryKey: [query, "purchase"],
    queryFn: () => fetchSubscriptionDetails(),
  });
};

export { usePurchases, getMyPurchases };
