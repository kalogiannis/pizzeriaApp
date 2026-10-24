// @vitest-environment jsdom

import { beforeEach, describe, expect, it } from "vitest";
import { createLocalOrder, getLocalOrders } from "./orders";
import type { CartItem } from "@/types";

// This is a fixture: reusable sample data used by more than one test.
const margherita: CartItem = {
  _id: "margherita-1",
  name: "Margherita",
  price: 8.5,
  quantity: 1,
  image: "/images/margherita.jpg",
  selectedOptions: [],
  totalPrice: 8.5,
};

describe("createLocalOrder", () => {
  // Each test must start without data left by an earlier test.
  beforeEach(() => {
    localStorage.clear();
  });

  it("creates an order with the cart items and correct total", () => {
    // Arrange: prepare the input data.
    const customerEmail = "giannis@example.com";

    // Act: call the function that we want to test.
    const order = createLocalOrder([margherita], customerEmail);

    // Assert: check the returned order.
    expect(order.items).toEqual([margherita]);
    expect(order.total).toBe(8.5);
    expect(order.customerEmail).toBe(customerEmail);
    expect(order.status).toBe("preparing");

    // Also assert that the order was persisted in localStorage.
    expect(getLocalOrders(customerEmail)).toEqual([order]);
  });

  it("calculates the total for multiple cart items", () => {
    const pepperoni: CartItem = {
      ...margherita,
      _id: "pepperoni-1",
      name: "Pepperoni",
      price: 10,
      quantity: 2,
      totalPrice: 20,
    };

    const order = createLocalOrder([margherita, pepperoni], "giannis@example.com");

    expect(order.items).toHaveLength(2);
    expect(order.total).toBe(28.5);
  });
});
