import { TCreateNoteDTO } from '@/dtos/index.js';
import { NoteDAO } from '@/dao/index.js';
import { INoteSchemaShape } from '@/interfaces/note.interface.js';
import { NotFoundException } from '@/utils/customErrors.js';
import { ObjectId } from 'mongoose';

class NoteServices {
    constructor(private readonly notesDao: NoteDAO) {}
    async createNote(noteData: TCreateNoteDTO): Promise<INoteSchemaShape> {
        const note = this.notesDao.createNote(noteData);
        return note;
    }

    async getNoteById(noteId: ObjectId | string): Promise<INoteSchemaShape> {
        const note = await this.notesDao.getNoteById(noteId);
        if (!note) {
            throw new NotFoundException('Note not found');
        }
        return note;
    }
}

export default new NoteServices(new NoteDAO());
