import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";

interface ProfileFetch {
  result: Profile;
}

export interface Profile {
  user_id: number;
  profile_url: string;
  display_name: string;
  title: string;
  about_me: string;
  genre: string;
  location: string;
  country: string;
  bookings: string;
  management: string;
  profile_picture: string;
  cover_photo: string;
  music_genre: string;
  website: string;
  twitter: string;
  soundcloud: string;
  facebook: string;
  instagram: string;
  spotify: string;
  tiktok: string;
  mixcloud: string;
  youtube: string;
}

export interface ISubscription {
  id: number;
  user_id: number;
  user_key: string;
  dj_user_id: number;
  created_at: string;
  updated_at: string;
  period_start: string;
  period_end: string;
  subscription: string;
  customer: string;
  amount: string;
  accesslevel: number;
  description: string;
  product: number;
  status_id: number;
  profile_url?: string;
}

export interface IAudioForProduct {
  location: string;
  artwork: string;
  label: string;
  artist: string;
  release_name: string;
  release_date: string;
  genre: string;
  sample: string;
}

export interface IProduct {
  id: number;
  user_id: number;
  name: string;
  accesslevel_id: number;
  created_at: string;
  updated_at: string;
  active: number;
  type: number;
  product_type: string;
  sku: string;
  image_url: string;
  description: string;
  audio: IAudioForProduct[];
  default_price: {
    currency: string;
    unit_amount_decimal: number;
  };
  purchased: ProductPurchaseStatus;
}

export enum ProductPurchaseStatus {
  PURCHASED = 1,
}

const useProfile = (username: string) => {
  const fetchProfile = () =>
    apiClient.get<ProfileFetch>("/artist/" + username).then((res) => {
      return res.data.result;
    });

  return useQuery<Profile, Error>({
    queryKey: [username, "profile"],
    queryFn: () => fetchProfile(),
  });
};

const getPurchaseLinkWithPurchase = async (purchase: any) => {
  const res = await apiClient.post(`/purchase`, purchase);
  return res.data.result;
};

const getPurchaseLink = async (
  username: string,
  type: string,
  redirect_url?: string
) => {
  const res = await apiClient.get(
    `/artist/${username}/membership/link?_type=${type}&_redirect_url=${redirect_url}`
  );
  return res.data.result;
};

const getMySubscriptionDetails = (query: {
  page: number;
  pageSize: number;
}) => {
  const fetchSubscriptionDetails = () =>
    apiClient.get("/me/subscriptions").then((res) => {
      return res.data.result;
    });

  return useQuery<ISubscription[], Error>({
    queryKey: [query, "subscriptions"],
    queryFn: () => fetchSubscriptionDetails(),
  });
};

const useProducts = (
  profile_url: string,
  query: { pageSize: number; productType?: string }
) => {
  const fetchProducts = (pageParam: number) => {
    return apiClient
      .get<{ result: IProduct[] }>("/artist/" + profile_url + "/products", {
        params: {
          _start: (pageParam - 1) * query.pageSize,
          _limit: query.pageSize,
          ...(query.productType && { _type: query.productType }),
        },
      })
      .then((res) => {
        return res.data.result;
      });
  };

  return useInfiniteQuery<IProduct[], Error>({
    queryKey: [profile_url, "products", query],
    queryFn: ({ pageParam = 1 }) => fetchProducts(pageParam),
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 && lastPage.length === query.pageSize
        ? allPages.length + 1
        : undefined;
    },
  });
};

const useProductDetails = (product_id: string) => {
  const fetchProductDetails = () =>
    apiClient.get("/products?product_id=" + product_id).then((res) => {
      return res.data.result;
    });

  return useQuery<IProduct, Error>({
    queryKey: [product_id, "product"],
    queryFn: () => fetchProductDetails(),
  });
};

const useMessageProduct = (username: string) => {
  const fetchProductDetails = () =>
    apiClient.get(`/artist/${username}/messagebundle`).then((res) => {
      return res.data.result;
    });
  return useQuery<IProduct, Error>({
    queryKey: [username + "messagebundle", "product"],
    queryFn: () => fetchProductDetails(),
  });
};

const getSpecialOfferPaymentLink = async (username: string) => {
  const res = await apiClient.get(`/artist/${username}/trial`);
  return res.data.result;
};

const upgradeSubscription = async (subscription_id: string) => {
  const res = await apiClient.patch(
    `/me/subscription/${subscription_id}/upgrade`
  );
  return res.data.result;
};

const updateProfilePicture = (file: File) => {
  const data = new FormData();
  data.append("file", file);
  return apiClient.post("/me/profile_picture", data);
};

export {
  useProfile,
  getMySubscriptionDetails,
  getPurchaseLink,
  useProducts,
  useProductDetails,
  useMessageProduct as getMessageProduct,
  getSpecialOfferPaymentLink,
  upgradeSubscription,
  updateProfilePicture,
  getPurchaseLinkWithPurchase,
};
