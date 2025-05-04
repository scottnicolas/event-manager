import api from "../api/api";
import { Event } from "../types/Event";

const endpoint = "events/";

export const fetchEvents = async (): Promise<Event[]> =>
  (await api.get(endpoint)).data;
export const fetchEventById = async (id: number): Promise<Event> =>
  (await api.get(`${endpoint}${id}/`)).data;
export const createEvent = async (data: Partial<Event>): Promise<Event> =>
  (await api.post(endpoint, data)).data;
export const updateEvent = async (
  id: number,
  data: Partial<Event>
): Promise<Event> => (await api.put(`${endpoint}${id}/`, data)).data;
export const deleteEvent = async (id: number): Promise<void> => {
  await api.delete(`${endpoint}${id}/`);
};

export default {
  fetchEvents,
  fetchEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
