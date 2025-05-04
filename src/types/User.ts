export interface User {
  user_id: number;
  first_name: string;
  middle_initial?: string | null;
  last_name: string;
  email?: string | null;
  phone_number: string;
}
