import api from "../api/api";
import { Ticket } from "../types/Ticket";

const endpoint = "tickets/";

export const fetchTickets = async (): Promise<Ticket[]> =>
  (await api.get(endpoint)).data;
export const fetchTicketById = async (id: number): Promise<Ticket> =>
  (await api.get(`${endpoint}${id}/`)).data;
export const createTicket = async (data: Partial<Ticket>): Promise<Ticket> =>
  (await api.post(endpoint, data)).data;
export const updateTicket = async (
  id: number,
  data: Partial<Ticket>
): Promise<Ticket> => (await api.put(`${endpoint}${id}/`, data)).data;
export const deleteTicket = async (id: number): Promise<void> => {
  await api.delete(`${endpoint}${id}/`);
};

export default {
  fetchTickets,
  fetchTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
};
