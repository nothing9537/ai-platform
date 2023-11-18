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
  prompt: z.string().min(1, { message: 'Image Prompt is required' }), // * Input
  duration: z.number().min(1, { message: 'Duration is required' }), // * Input
  seed: z.number().int({ message: 'Seed must be integer' }), // * Input
  output_format: z.string().min(1, { message: 'Format required' }), // * Select
  normalization_strategy: z.string().min(1, { message: 'Normalization required' }), // * Select
  model_version: z.string().min(1, { message: 'Model version required' }), // * Select
});
