
import type { CartItem } from "@/types";

export type OrderRecord = {
  id: string;
  createdAt: string;
  readyAt: string;
  customerEmail: string;
  items: CartItem[];
  total: number;
  status: "preparing" | "ready" | "completed";
};


const ORDERS_KEY = "pizzeria-orders-v2";

const readOrders = (): OrderRecord[] => {
  try {
    const value = localStorage.getItem(ORDERS_KEY);
    return value ? (JSON.parse(value) as OrderRecord[]) : [];
  } catch {
    return [];
  }
};

const writeOrders = (orders: OrderRecord[]) => {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
};

export const createLocalOrder = (items: CartItem[], customerEmail: string): OrderRecord => {
  const createdAt = new Date();
  const readyAt = new Date(createdAt.getTime() + 30 * 60 * 1000);
  const order: OrderRecord = {
    id: `PZ-${Date.now().toString(36).toUpperCase()}`,
    createdAt: createdAt.toISOString(),
    readyAt: readyAt.toISOString(),
    customerEmail,
    items,
    total: items.reduce(
      (sum, item) => sum + (item.totalPrice ?? item.price * item.quantity),
      0,
    ),
    status: "preparing",
  };

  writeOrders([order, ...readOrders()]);
  return order;
};

export const getLocalOrders = (customerEmail?: string): OrderRecord[] => {
  const orders = readOrders();
  return customerEmail
    ? orders.filter((order) => order.customerEmail === customerEmail)
    : orders;
};

export const getLocalOrder = (id: string): OrderRecord | undefined =>
  readOrders().find((order) => order.id === id);
