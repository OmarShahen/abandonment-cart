import { z } from "zod";
import { TriggerEvent } from "@prisma/client";

export const addAbandonmentEventSchema = z.object({
  storeId: z
    .string({ message: "store ID is required" })
    .min(1, { message: "store ID is invalid" }),
  sessionId: z
    .string({ message: "session ID is required" })
    .min(1, { message: "session ID is invalid" }),

  triggerType: z.enum(TriggerEvent, "trigger type is required"),

  items: z
    .array(
      z.object({
        id: z
          .string({ message: "Item ID is required" })
          .min(1, { message: "Invalid ID" }),
        name: z
          .string({ message: "Item name is required" })
          .min(1, { message: "Invalid name" }),
        quantity: z
          .number({ message: "Quantity must be a number" })
          .int({ message: "Quantity must be an integer" })
          .positive({ message: "Quantity must be greater than 0" }),
        price: z
          .number({ message: "Price must be a number" })
          .nonnegative({ message: "Price cannot be negative" }),
      }),
      "items is required"
    )
    .min(1, { message: "at least one item is required" }),
});
