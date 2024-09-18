import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";

interface EventFetch {
  result: ProfileEvent[];
}

export interface ProfileEvent {
  id: number;
  event_id: number;
  event_name: string;
  event_date: string;
  start_time: string;
  end_time: string;
  description: string;
  link_buy_tickets: string;
  artwork: string;
  venue: string;
  city: string;
  created_at: string | null;
  updated_at: string | null;
  venue_id: number;
  url?: string;
  guest_invite_number: number;
  guest_invite_start?: string;
  guest_invite_end?: string;
  venue_address?: string;
  venue_blurb?: string;
  venue_logo?: string;
  venue_name?: string;
  venue_photo?: string;
  lineup?: string;
  guestlist_available: number;
}

export enum EventPeriod {
  "PAST" = "past",
  "UPCOMING" = "upcoming",
}

interface EventQuery {
  pageSize: number;
  type?: number;
  period?: EventPeriod;
}

interface EventCalendarQuery {
  pageSize: number;
  _country_code: string;
  _startdate: string;
  _enddate: string;
}

interface EventQueryForSearch {
  search: string;
  startDate?: string;
  endDate?: string;
}

export interface GuestList {
  guestlist: boolean;
  status: EventGuestListStatus;
  allowChange: boolean;
  status_id: number;
  code: string;
}

export enum EventGuestListStatus {
  NOT_STARTED = "not-started",
  NOT_SIGNED_UP = "not-signed-up",
  SIGNED_UP = "signed-up",
  ON_SHORT_LIST = "on-short-list",
  ON_LIST = "on-list",
  OFF_LIST = "off-list",
}

const useEvents = (username: string, query: EventQuery) => {
  const fetchEvents = (pageParam: number) => {
    return apiClient
      .get<EventFetch>("/artist/" + username + "/events", {
        params: {
          _start: (pageParam - 1) * query.pageSize,
          _limit: query.pageSize,
          _period: query.period,
        },
      })
      .then((res) => {
        return res.data.result;
      });
  };
  return useInfiniteQuery<ProfileEvent[], Error>({
    queryKey: [username, "events", query],
    queryFn: ({ pageParam = 1 }) => fetchEvents(pageParam),
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 && lastPage.length === query.pageSize
        ? allPages.length + 1
        : undefined;
    },
  });
};

const useEventsForCalendar = (query: EventCalendarQuery, queryKey: any[]) => {
  const fetchEvents = (pageParam: number) => {
    return apiClient
      .get<EventFetch>("/events/calendar", {
        params: {
          _country_code: query._country_code,
          _startdate: query._startdate,
          _enddate: query._enddate,
        },
      })
      .then((res) => {
        return res.data.result;
      });
  };

  return useInfiniteQuery<ProfileEvent[], Error>({
    queryKey: queryKey,
    queryFn: ({ pageParam = 1 }) => fetchEvents(pageParam),
    keepPreviousData: false,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 && lastPage.length === query.pageSize
        ? allPages.length + 1
        : undefined;
    },
  });
};

const useEventsForSearch = (query: EventQueryForSearch) => {
  const fetchEvents = () => {
    return apiClient
      .get<EventFetch>("/search", {
        params: {
          type: "event",
          query: query.search,
          _startdate: !query.startDate ? undefined : query.startDate,
          _enddate: !query.endDate ? undefined : query.endDate,
        },
      })
      .then((res) => {
        return res.data.result;
      });
  };

  return useQuery<ProfileEvent[], Error>({
    queryKey: ["events", query],
    queryFn: () => fetchEvents(),
  });
};

const getEventById = async (profile_url: string, id: string) => {
  try {
    const res = await apiClient.get<{ result: ProfileEvent[] }>(
      `/artist/${profile_url}/event/${id}`
    );
    return res.data.result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getGuestListEvent = async (profile_url: string, id: string) => {
  try {
    const res = await apiClient.get<{
      result: boolean;
      guestlist: boolean;
      status: EventGuestListStatus;
      status_id: number;
      allowChange: boolean;
      code: string;
      params: {
        event_id: string;
        fan_id: number;
      };
    }>(`/artist/${profile_url}/event/${id}/guestlist`);
    return res.data;
  } catch (error) {
    console.log(error);
    return {
      result: false,
      guestlist: false,
      status: EventGuestListStatus.NOT_STARTED,
      status_id: 0,
      allowChange: false,
      code: "",
      params: {},
    };
  }
};

const updateGuestListEvent = async (
  profile_url: string,
  id: string,
  guestlist: boolean
) => {
  try {
    const res = await apiClient.patch(
      `/artist/${profile_url}/event/${id}/guestlist`,
      {
        signup: guestlist,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const useUserEventData = async (eventIds: number[]) => {
  try {
    const res = await apiClient.get(
      `/events/user?event_id=${eventIds.join(",")}`
    );
    return res.data.result;
  } catch (e) {
    return [];
  }
};

const useContriesData = async () => {
  try {
    const res = await apiClient.get(`/events/calendar/filter/countries`);
    return res.data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
};

export {
  useEvents,
  useEventsForSearch,
  getEventById,
  getGuestListEvent,
  updateGuestListEvent,
  useUserEventData,
  useEventsForCalendar,
  useContriesData,
};
