import axios from "axios";
import { Event } from "../types/Event";
const EVENT_URL =
  "https://eventmanagementsystemdjangoproject.onrender.com/api/events/";

export const fetchEvents = async (): Promise<Event[]> =>
  (await axios.get(`${EVENT_URL}?format=json`)).data;
export const getEventById = async (id: number): Promise<Event> =>
  (await axios.get(`${EVENT_URL}${id}/?format=json`)).data;
export const createEvent = async (
  data: Omit<Event, "event_id">
): Promise<Event> => (await axios.post(EVENT_URL, data)).data;
export const updateEvent = async (
  id: number,
  data: Partial<Event>
): Promise<Event> => (await axios.put(`${EVENT_URL}${id}/`, data)).data;
export const deleteEvent = async (id: number): Promise<void> => {
  await axios.delete(`${EVENT_URL}${id}/`);
};
