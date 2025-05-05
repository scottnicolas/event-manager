import axios from "axios";
import { Venue } from "../types/Venue";
const VENUE_URL =
  "https://eventmanagementsystemdjangoproject.onrender.com/api/venues/";
export const fetchVenues = async (): Promise<Venue[]> =>
  (await axios.get(`${VENUE_URL}?format=json`)).data;
export const getVenueById = async (id: number): Promise<Venue> =>
  (await axios.get(`${VENUE_URL}${id}/?format=json`)).data;
export const createVenue = async (
  data: Omit<Venue, "venue_id">
): Promise<Venue> => (await axios.post(VENUE_URL, data)).data;
export const updateVenue = async (
  id: number,
  data: Partial<Venue>
): Promise<Venue> => (await axios.put(`${VENUE_URL}${id}/`, data)).data;
export const deleteVenue = async (id: number): Promise<void> => {
  await axios.delete(`${VENUE_URL}${id}/`);
};
