import { Document, Types } from 'mongoose';

export interface INoteSchemaShape extends Document {
    _id: Types.ObjectId;
    title: string;
    content: string;
    tags: string[];
    priority: 'low' | 'medium' | 'high';
    isPinned: boolean;
    isArchived: boolean;
    isTrashed: boolean;
    colorLabel?: string;
    reminderAt?: Date;
    user: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICreateNoteDto {
    title: string;
    content: string;
    tags?: string[];
    priority?: 'low' | 'medium' | 'high';
    colorLabel?: string;
    reminderAt?: Date;
}

export interface IUpdateNoteDto {
    title: string;
    content: string;
    tags: string[];
    priority: 'low' | 'medium' | 'high';
    colorLabel: string;
    reminderAt: Date;
    isPinned: boolean;
    isArchived: boolean;
    isTrashed: boolean;
}
