export interface Payment {
  payment_id: number;
  payment_amount?: string | null;
  payment_status?: string | null;
  payment_method?: string | null;
}
