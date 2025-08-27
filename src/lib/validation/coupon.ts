import { z } from "zod";

export const validateCoupon = z.object({
  storeId: z
    .string({ message: "store ID is required" })
    .min(1, { message: "store ID is invalid" }),
  sessionId: z
    .string({ message: "session ID is required" })
    .min(1, { message: "session ID is invalid" }),

  code: z.string({ message: "code is required" }).min(1, "code is invalid"),
});
