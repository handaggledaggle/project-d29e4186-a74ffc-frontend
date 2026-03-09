import type { ID, ISODateTimeString } from "./common";

export type OrderStatus =
  | "PENDING_PAYMENT"
  | "PAID"
  | "PAYMENT_FAILED"
  | "CANCELLED";

export type OrderItem = {
  artwork_id: ID;
  title?: string;
  thumbnail_url?: string;
  unit_price?: number;
  quantity: number;
};

export type Order = {
  order_id: ID;
  items: OrderItem[];
  total_amount: number;
  status: OrderStatus;
  created_at: ISODateTimeString;
  payment_info?: {
    provider: "TOSS";
    transaction_id?: string;
    method?: string;
    approved_at?: ISODateTimeString;
  };
};

export type OrderCreateRequest = {
  user_id: ID;
  items: { artwork_id: ID; quantity: number }[];
  payment_method: "TOSS";
  shipping_info?: Record<string, unknown>;
};

export type OrderCreateResponse = {
  order_id: ID;
  total_amount: number;
  status: "PENDING_PAYMENT";
  created_at: ISODateTimeString;
};

export type OrderListResponse = {
  orders: Order[];
  total_count: number;
};
