import Joi, { ObjectSchema } from 'joi';
import { TColorNoteDTO, TCreateNoteDTO, TUpdateNoteDTO } from '@/dtos/index.js';

export const createNoteSchema: ObjectSchema<TCreateNoteDTO> = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    content: Joi.string().min(10).required(),
    user: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).optional(),
    priority: Joi.string().valid('low', 'medium', 'high').optional(),
    colorLabel: Joi.string().optional(),
    reminderAt: Joi.date().optional(),
});

export const updateNoteSchema: ObjectSchema<TUpdateNoteDTO> = Joi.object({
    title: Joi.string().min(3).max(100),
    content: Joi.string().min(10),
    tags: Joi.array().items(Joi.string()),
    priority: Joi.string().valid('low', 'medium', 'high'),
    colorLabel: Joi.string(),
    reminderAt: Joi.date(),
    isPinned: Joi.boolean(),
    isArchived: Joi.boolean(),
    isTrashed: Joi.boolean(),
}).or('title', 'content', 'tags', 'priority', 'colorLabel', 'reminderAt');

export const updateColorSchema: ObjectSchema<TColorNoteDTO> = Joi.object({
    colorLabel: Joi.string().required().label('colorLabel'),
});
