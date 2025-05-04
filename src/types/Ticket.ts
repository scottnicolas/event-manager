export interface Ticket {
  ticket_id: number;
  price: string;
  ticket_type: string;
  is_ticket_free: boolean;
  payment?: number | null;
}
