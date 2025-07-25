import { INoteSchemaShape } from '@/interfaces/note.interface.js';
import { Schema, model } from 'mongoose';

const noteSchema: Schema<INoteSchemaShape> = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
        },
        content: {
            type: String,
            required: [true, 'Content is required'],
            trim: true,
        },
        tags: { type: [String], default: [] },
        priority: {
            type: String,
            enum: ['low', 'medium', 'high'],
            default: 'low',
        },
        isPinned: {
            type: Boolean,
            default: false,
        },
        isArchived: {
            type: Boolean,
            default: false,
        },
        isTrashed: {
            type: Boolean,
            default: false,
        },
        colorLabel: {
            type: String,
            default: '#00FF00',
        },
        reminderAt: {
            type: Date,
            default: () => new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true },
);

export const Note = model<INoteSchemaShape>('Note', noteSchema);
