import axios from "axios";
import { Ticket } from "../types/Ticket";
const TICKET_URL =
  "https://eventmanagementsystemdjangoproject.onrender.com/api/tickets/";
export const fetchTickets = async (): Promise<Ticket[]> =>
  (await axios.get(`${TICKET_URL}?format=json`)).data;
export const getTicketById = async (id: number): Promise<Ticket> =>
  (await axios.get(`${TICKET_URL}${id}/?format=json`)).data;
export const createTicket = async (
  data: Omit<Ticket, "ticket_id">
): Promise<Ticket> => (await axios.post(TICKET_URL, data)).data;
export const updateTicket = async (
  id: number,
  data: Partial<Ticket>
): Promise<Ticket> => (await axios.put(`${TICKET_URL}${id}/`, data)).data;
export const deleteTicket = async (id: number): Promise<void> => {
  await axios.delete(`${TICKET_URL}${id}/`);
};
