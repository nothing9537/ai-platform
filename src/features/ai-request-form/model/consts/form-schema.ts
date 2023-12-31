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
  prompt: z.string().min(1, { message: 'Image prompt is required' }), // * Input
  duration: z.number().min(1, { message: 'Duration is required' }).max(30, { message: 'Maximum values is 30' }), // * Input
  seed: z.number().int({ message: 'Seed must be integer' }), // * Input
  output_format: z.string().min(1, { message: 'Format required' }), // * Select
  normalization_strategy: z.string().min(1, { message: 'Normalization required' }), // * Select
  model_version: z.string().min(1, { message: 'Model version required' }), // * Select
});

export const VideoSchema = z.object({
  prompt: z.string().min(1, { message: 'Prompt is required' }), // * Input
  negative_prompt: z.string().optional(), // * Input
  width: z.number().int({ message: 'Width must be integer' }).optional(), // * Input
  height: z.number().int({ message: 'Height must be integer' }).optional(), // * Input
  fps: z.number().int({ message: 'FPS must be integer' }).min(1, { message: 'FPS cannot be lower than 1' }).max(60, { message: 'FPS cannot be greater than 60' })
    .optional(), // * Input
  model: z.string().min(1, { message: 'Model is required' }), // * Select
});
