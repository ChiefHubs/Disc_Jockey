import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";

interface VenuesFetch {
  result: Venue[];
}

interface VenueFetch {
  result: Venue;
}

export interface Venue {
    url: string;
    name: string; 
    website: string; 
    capacity: string; 
    blurb: string; 
    photo: string; 
    logo: string; 
    address: string; 
    country: string;
}

interface VenueQuery {
  pageSize: number;
  type?: number;
}

interface EventFetch {
  result: ProfileEvent[];
}

export interface ProfileEvent {
  id: number;
  event_id: number;
  venue_id: number;
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
  dj_profile_url?: string;
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

export interface GuestList {
  guestlist: boolean;
  status: EventGuestListStatus;
  allowChange: boolean;
  status_id: number;
  code: string;
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

interface EventQueryForSearch {
  search: string;
  startDate?: string;
  endDate?: string;
}

export enum EventGuestListStatus {
  NOT_STARTED = "not-started",
  NOT_SIGNED_UP = "not-signed-up",
  SIGNED_UP = "signed-up",
  ON_SHORT_LIST = "on-short-list",
  ON_LIST = "on-list",
  OFF_LIST = "off-list",
}

export interface ArtistList { 
  data: Artist[];    
}

interface Artists { 
  result: boolean;
  data: Artist[];    
}

export type Artist = {
  user_id: number;
  user_key: string;
  display_name: string;
  profile_url: string;  
  profile_picture: string;
  cover_photo: string;
};

const useVenues = (query: VenueQuery) => {
  const fetchVenues = (pageParam: number) => {
    return apiClient
      .get<VenuesFetch>("/venues", {
        params: {
          _start: (pageParam - 1) * query.pageSize,
          _limit: query.pageSize,
        },
      })
      .then((res) => {
        return res.data.result;
      });
  };

  return useInfiniteQuery<Venue[], Error>({
    queryKey: ["venues", query],
    queryFn: ({ pageParam = 1 }) => fetchVenues(pageParam),
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 && lastPage.length === query.pageSize
        ? allPages.length + 1
        : undefined;
    },
  });
};

const useVenue = (venueurl: string) => {
  const fetchVenue = () =>
    apiClient.get<VenueFetch>("/venues/" + venueurl).then((res) => {
      return res.data.result[0];
    });

  return useQuery<Venue, Error>({
    queryKey: [venueurl, "venue"],
    queryFn: () => fetchVenue(),
  });
};

const useVenueEvents = (venueurl: string, query: EventQuery) => {
  const fetchEvents = (pageParam: number) => {
    return apiClient
      .get<EventFetch>("/venues/" + venueurl + "/events", {
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
    queryKey: [venueurl, "events", query],
    queryFn: ({ pageParam = 1 }) => fetchEvents(pageParam),
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 && lastPage.length === query.pageSize
        ? allPages.length + 1
        : undefined;
    },
  });
};

const getVenueEvent = async (venueurl: string, eventurl: string) => {
  try {
    const res = await apiClient.get<{ result: ProfileEvent[] }>(
      `/venues/${venueurl}/event/${eventurl}`
    );  
    return res.data.result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const updateVenueGuestListEvent = async (
  venueurl: string,
  eventurl: string,
  guestlist: boolean
) => {
  try {
    const res = await apiClient.patch(`/venues/${venueurl}/event/${eventurl}/guestlist`, {
      signup: guestlist,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

const getEventGuestList = async (venueurl: string, eventurl: string) => {
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
    }>(`/venues/${venueurl}/event/${eventurl}/guestlist`);
    return res.data;
  } catch (error) {
    console.log(error);
    return {
      result: false,
      guestlist: false,
      status: EventGuestListStatus.NOT_STARTED,
      allowChange: false,
      status_id: 0,
      code: '', 
      params: {},
    };
  }
};

const useVenueConnection = async (venueurl: string) => {
  const res = await apiClient.patch("/venues/" + venueurl + "/connect");
  return res.data;
};

const useVenueEventArtists = (venue_id: number, event_id: number) => {
  return apiClient.get<Artists>(`/venues/${venue_id}/event/${event_id}/artists`);
};

export {
  useVenues, useVenue, useVenueEvents, getVenueEvent, getEventGuestList, useVenueConnection, useVenueEventArtists, updateVenueGuestListEvent
};
