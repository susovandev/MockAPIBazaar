import { TCreateNoteDTO } from '@/dtos/index.js';
import { INoteSchemaShape } from '@/interfaces/note.interface.js';
import { Note } from '@/models/note.model.js';
import { NotFoundException } from '@/utils/customErrors.js';
import { ObjectId } from 'mongoose';

export class NoteDAO {
    async createNote(noteData: TCreateNoteDTO): Promise<INoteSchemaShape> {
        return await Note.create(noteData);
    }

    async getNoteById(noteId: ObjectId | string): Promise<INoteSchemaShape> {
        const note = await Note.findById(noteId);
        if (!note) {
            throw new NotFoundException('Note not found');
        }
        return note;
    }
}
