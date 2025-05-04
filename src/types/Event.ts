export interface Event {
  event_id: number;
  event_name: string;
  start_date: string; // ISO datetime
  end_date?: string | null;
  event_category?: string | null;
  max_attendees: number;
}
