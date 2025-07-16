import { Document, Types } from 'mongoose';

export interface INoteSchemaShape extends Document {
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
