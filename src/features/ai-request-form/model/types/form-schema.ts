import { z } from 'zod';
import { formSchema } from '../consts/form-schema';

export type FormSchema = z.infer<typeof formSchema>;
