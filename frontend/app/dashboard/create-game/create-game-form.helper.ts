import { z } from 'zod';

export const formSchema = z.object({
  city: z.string().min(1, { message: 'Provide city' }),
  theme: z.string().min(1, { message: 'Provide theme' }),
  points: z.string().min(1, { message: 'Provide number of points' }),
  participants: z
    .string()
    .min(1, { message: 'Provide number of participants' }),
});

export type CreateGameFormValues = z.infer<typeof formSchema>;
