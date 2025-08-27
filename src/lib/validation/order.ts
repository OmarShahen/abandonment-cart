import { z } from "zod";

export const orderCreationSchema = z.object({
  sessionId: z
    .string({ message: "session ID is required" })
    .min(1, { message: "session ID is invalid" }),

  customerEmail: z
    .string("customer email is required")
    .email("customer email is invalid"),
  customerName: z
    .string("customer name is required")
    .min(1, "customer name is invalid"),

  couponId: z.string("coupon ID is invalid").optional(),

  items: z
    .array(
      z.object({
        productId: z
          .string({ message: "Item ID is required" })
          .min(1, { message: "Invalid product ID" }),
        quantity: z
          .number({ message: "Quantity must be a number" })
          .int({ message: "Quantity must be an integer" })
          .positive({ message: "Quantity must be greater than 0" }),
      }),
      "items is required"
    )
    .min(1, { message: "at least one item is required" }),
});
