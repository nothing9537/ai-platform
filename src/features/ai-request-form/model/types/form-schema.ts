import { z } from 'zod';
import { TextFormSchema, ImageFormSchema } from '../consts/form-schema';

export type TextFormSchemaType = z.infer<typeof TextFormSchema>;
export type ImageFormSchemaType = z.infer<typeof ImageFormSchema>;

export type FormSchema = typeof TextFormSchema | typeof ImageFormSchema;
export type FromSchemaType = TextFormSchemaType | ImageFormSchemaType;
