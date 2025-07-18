import Joi from 'joi';

export const createNoteSchema = Joi.object({
    title: Joi.string().min(3).max(100).trim().required(),
    content: Joi.string().min(10).trim().required(),
    user: Joi.string().trim().required(),
    tags: Joi.array().items(Joi.string()).optional(),
    priority: Joi.string().valid('low', 'medium', 'high').optional(),
    colorLabel: Joi.string().optional(),
    reminderAt: Joi.date().optional(),
});

export const updateNoteSchema = Joi.object({
    title: Joi.string().min(3).max(100),
    content: Joi.string().min(10),
    tags: Joi.array().items(Joi.string()),
    priority: Joi.string().valid('low', 'medium', 'high'),
    colorLabel: Joi.string().min(3).max(7).label('colorLabel'),
    reminderAt: Joi.date(),
    isPinned: Joi.boolean(),
    isArchived: Joi.boolean(),
    isTrashed: Joi.boolean(),
}).or(
    'title',
    'content',
    'tags',
    'priority',
    'colorLabel',
    'reminderAt',
    'isPinned',
    'isArchived',
    'isTrashed',
);

export const colorSchema = Joi.object({
    colorLabel: Joi.string()
        .pattern(/^#(?:[0-9a-fA-F]{3}){1,2}$/)
        .required()
        .label('colorLabel'),
});

export const reminderAtSchema = Joi.object({
    date: Joi.date().required().label('date'),
});
