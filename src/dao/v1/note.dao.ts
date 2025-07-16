import { TCreateNoteDTO } from '@/dtos/index.js';
import { INoteSchemaShape } from '@/interfaces/note.interface.js';
import { Note } from '@/models/note.model.js';

export class NoteDAO {
    async createNote(noteData: TCreateNoteDTO): Promise<INoteSchemaShape> {
        return await Note.create(noteData);
    }
}
