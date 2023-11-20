import { z } from 'zod';
import { TextFormSchema, ImageFormSchema, MusicFormSchema, VideoSchema } from '../consts/form-schema';

export type TextFormSchemaType = z.infer<typeof TextFormSchema>;
export type ImageFormSchemaType = z.infer<typeof ImageFormSchema>;
export type MusicFormSchemaType = z.infer<typeof MusicFormSchema>;
export type VideoFormSchemaType = z.infer<typeof VideoSchema>;

export type FormSchema = typeof TextFormSchema | typeof ImageFormSchema | typeof MusicFormSchema | typeof VideoSchema;
