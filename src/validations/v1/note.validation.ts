import Joi, { ObjectSchema } from 'joi';
import { TCreateNoteDTO, TUpdateNoteDTO } from '@/dtos/index.js';

export const CreateNoteSchema: ObjectSchema<TCreateNoteDTO> = Joi.object({
    title: Joi.string().min(1).max(100).required(),
    content: Joi.string().min(1).required(),
    user: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).optional(),
    priority: Joi.string().valid('low', 'medium', 'high').optional(),
    colorLabel: Joi.string().optional(),
    reminderAt: Joi.date().optional(),
});

export const UpdateNoteSchema: ObjectSchema<TUpdateNoteDTO> = Joi.object({
    title: Joi.string().min(1).max(100),
    content: Joi.string().min(1),
    tags: Joi.array().items(Joi.string()),
    priority: Joi.string().valid('low', 'medium', 'high'),
    colorLabel: Joi.string(),
    reminderAt: Joi.date(),
    isPinned: Joi.boolean(),
    isArchived: Joi.boolean(),
    isTrashed: Joi.boolean(),
}).or('title', 'content', 'tags', 'priority', 'colorLabel', 'reminderAt');
