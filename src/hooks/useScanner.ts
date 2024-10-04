import apiClient from "../services/api-client";

export interface validationResult {
  event_name: string;
  event_date: string;
  venue: string;
  type: string;
  guestlist?: guestlist;
  backstagelist?: backstagelist;
}
interface guestlist {
  scan_date: string | null;
  status: number;
  name: string;
  user: number;
  used: boolean;
}
interface backstagelist {
  scan_date: string | null;
  status: number;
  name: string;
  user: number;
  used: boolean;
}

const getValidationQRCode = (eventKey: string, qrCode: string) => {
  return apiClient.get<validationResult>(`/scanner/${eventKey}/${qrCode}`);
};

interface eventCheckResult {
  result: boolean;
}

interface postCheckResult {
  result: boolean;
}

const getEventCheck = (eventKey: string) => {
  return apiClient.get<eventCheckResult>(`/scanner/${eventKey}`);
};

const getPostCheck = (postKey: string) => {
  return apiClient.get<postCheckResult>(`/scanner/${postKey}`);
};

export { getValidationQRCode, getEventCheck, getPostCheck };
