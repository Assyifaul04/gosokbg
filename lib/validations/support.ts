import { z } from "zod";
import { containsBadWords, countLinks } from "./profanity";

export const supportTicketSchema = z
  .object({
    name: z.string().min(2).max(80),
    email: z.string().email().max(120),
    category: z.enum(["BUG", "QUESTION", "FEEDBACK", "PARTNERSHIP"]),
    subject: z.string().min(3).max(150),
    message: z.string().min(10).max(5000),
  })
  .superRefine((data, ctx) => {
    // Cek kata kasar di subjek & pesan
    const combined = `${data.subject} ${data.message}`;
    const { found, words } = containsBadWords(combined);

    if (found) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Pesan mengandung kata yang tidak pantas. Mohon gunakan bahasa yang sopan.",
        path: ["message"],
      });
    }

    // Cek jumlah link (maksimal 2)
    if (countLinks(data.message) > 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Terlalu banyak tautan dalam pesan. Maksimal 2 tautan.",
        path: ["message"],
      });
    }

    // Cek karakter berulang berlebihan
    if (/(.)\1{9,}/.test(data.message)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Pesan mengandung karakter berulang yang tidak wajar.",
        path: ["message"],
      });
    }
  });

export const ticketMessageSchema = z
  .object({
    body: z.string().min(1).max(5000),
  })
  .superRefine((data, ctx) => {
    const { found } = containsBadWords(data.body);
    if (found) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Balasan mengandung kata yang tidak pantas. Mohon gunakan bahasa yang sopan.",
        path: ["body"],
      });
    }

    if (countLinks(data.body) > 3) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Terlalu banyak tautan dalam balasan.",
        path: ["body"],
      });
    }
  });

export type SupportTicketInput = z.infer<typeof supportTicketSchema>;
export type TicketMessageInput = z.infer<typeof ticketMessageSchema>;