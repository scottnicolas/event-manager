import api from "../api/api";
import { Venue } from "../types/Venue";

const endpoint = "venues/";

export const fetchVenues = async (): Promise<Venue[]> =>
  (await api.get(endpoint)).data;
export const fetchVenueById = async (id: number): Promise<Venue> =>
  (await api.get(`${endpoint}${id}/`)).data;
export const createVenue = async (data: Partial<Venue>): Promise<Venue> =>
  (await api.post(endpoint, data)).data;
export const updateVenue = async (
  id: number,
  data: Partial<Venue>
): Promise<Venue> => (await api.put(`${endpoint}${id}/`, data)).data;
export const deleteVenue = async (id: number): Promise<void> => {
  await api.delete(`${endpoint}${id}/`);
};

export default {
  fetchVenues,
  fetchVenueById,
  createVenue,
  updateVenue,
  deleteVenue,
};
