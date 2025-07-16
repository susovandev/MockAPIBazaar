import Joi, { ObjectSchema } from 'joi';
import { TCreateNoteDTO } from '@/dtos/index.js';

export const CreateNoteSchema: ObjectSchema<TCreateNoteDTO> = Joi.object({
    title: Joi.string().min(1).max(100).required(),
    content: Joi.string().min(1).required(),
    tags: Joi.array().items(Joi.string()).optional(),
    priority: Joi.string().valid('low', 'medium', 'high').optional(),
    colorLabel: Joi.string().optional(),
    reminderAt: Joi.date().optional(),
});
