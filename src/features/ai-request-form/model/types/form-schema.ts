import { z } from 'zod';
import { TextFormSchema, TextWithSelectsFormSchema } from '../consts/form-schema';

export type TextFormSchemaType = z.infer<typeof TextFormSchema>;
export type TextWithSelectsFormSchemaType = z.infer<typeof TextWithSelectsFormSchema>;

export type FormSchema = typeof TextFormSchema | typeof TextWithSelectsFormSchema;
export type FromSchemaType = TextFormSchemaType | TextWithSelectsFormSchemaType;
