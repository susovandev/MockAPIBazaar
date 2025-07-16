import { INoteSchemaShape } from '@/interfaces/note.interface.js';

export type TCreateNoteDTO = Omit<
    INoteSchemaShape,
    'createdAt' | 'updatedAt' | 'user' | 'isTrashed' | 'isArchived' | 'isPinned'
>;

export type TResponseNoteDTO = INoteSchemaShape;
