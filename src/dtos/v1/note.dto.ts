import { INoteSchemaShape } from '@/interfaces/note.interface.js';

export type TCreateNoteDTO = Omit<
    INoteSchemaShape,
    'createdAt' | 'updatedAt' | 'user' | 'isTrashed' | 'isArchived' | 'isPinned'
>;
export type TUpdateNoteDTO = Partial<INoteSchemaShape>;
export type TResponseNoteDTO = INoteSchemaShape;
