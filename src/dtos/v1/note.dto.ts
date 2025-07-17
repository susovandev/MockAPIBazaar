import { INoteSchemaShape } from '@/interfaces/note.interface.js';

export type TCreateNoteDTO = {
    title: string;
    content: string;
    user: string;
    tags?: string[];
    priority?: 'low' | 'medium' | 'high';
    colorLabel?: string;
    reminderAt?: Date;
};
export type TUpdateNoteDTO = Partial<{
    title: string;
    content: string;
    tags: string[];
    priority: 'low' | 'medium' | 'high';
    colorLabel: string;
    reminderAt: Date;
    isPinned: boolean;
    isArchived: boolean;
    isTrashed: boolean;
}>;
export type TColorNoteDTO = TUpdateNoteDTO['colorLabel'];
export type TResponseNoteDTO = INoteSchemaShape;
