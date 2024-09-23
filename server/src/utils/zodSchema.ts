import { z } from 'zod';

// Define a Zod schema
export const contactSchema = z.object({
  id: z.number().int().optional(),
  name: z.string().min(1).max(255),
  outreachLocation: z.string(),
  phoneNumber: z.string().regex(/^[0-9]{10,20}$/), // Adjust the regex as needed
  outreachDateTime: z
    .string()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    }),
  contacted: z.boolean().default(false),
  groupName: z.string().min(1),
});

export const userSchema = z.object({});

export const firstTimerSchema = z.object({
  id: z.number().int().optional(),
  name: z.string().min(1).max(255),
  phoneNumber: z.string().regex(/^[0-9]{10,20}$/), // Adjust the regex as needed
  address: z.string().optional(),
  occupation: z.string().optional(),
  isStudent: z.boolean().default(false),
});
