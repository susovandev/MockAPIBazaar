import { TCreateNoteDTO, TUpdateNoteDTO } from '@/dtos/index.js';
import { INoteSchemaShape } from '@/interfaces/note.interface.js';
import { Note } from '@/models/note.model.js';

export class NoteDAO {
    async createNote(noteData: TCreateNoteDTO): Promise<INoteSchemaShape> {
        return await Note.create(noteData);
    }

    async getNoteById(noteId: string): Promise<INoteSchemaShape | null> {
        const note = await Note.findById(noteId);
        return note;
    }

    async updateNoteById(
        noteId: string,
        noteData: TUpdateNoteDTO,
    ): Promise<INoteSchemaShape | null> {
        return await Note.findByIdAndUpdate({ _id: noteId }, noteData, {
            new: true,
        }).lean();
    }

    async deleteNoteById(noteId: string): Promise<INoteSchemaShape | null> {
        return await Note.findByIdAndDelete(noteId).lean();
    }
}
