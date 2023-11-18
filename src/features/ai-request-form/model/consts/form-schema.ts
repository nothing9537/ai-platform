import * as z from 'zod';

export const TextFormSchema = z.object({
  prompt: z.string().min(1, { message: 'Prompt is required' }),
});

export const ImageFormSchema = z.object({
  prompt: z.string().min(1, { message: 'Image Prompt is required' }),
  amount: z.string().min(1, { message: 'Select an option' }),
  resolution: z.string().min(1, { message: 'Select an option' }),
});

export const MusicFormSchema = z.object({
  prompt: z.string().min(1, { message: 'Image Prompt is required' }),
  duration: z.number().min(1, { message: 'Duration is required' }),
  output_format: z.string().min(1, { message: 'Format required' }),
  normalization_strategy: z.string().min(1, { message: 'Normalization ' }),
});
