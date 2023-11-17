import * as z from 'zod';

export const TextFormSchema = z.object({
  prompt: z.string().min(1, { message: 'Prompt is required' }),
});

export const TextWithSelectsFormSchema = z.object({
  prompt: z.string().min(1, { message: 'Image Prompt is required' }),
  amount: z.string().min(1, { message: 'Select an option' }),
  resolution: z.string().min(1, { message: 'Select an option' }),
});
