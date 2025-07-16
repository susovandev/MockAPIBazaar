import { TCreateNoteDTO } from '@/dtos/index.js';
import { NoteDAO } from '@/dao/index.js';
import { INoteSchemaShape } from '@/interfaces/note.interface.js';

class NoteServices {
    constructor(private readonly notesDao: NoteDAO) {}
    async createNote(noteData: TCreateNoteDTO): Promise<INoteSchemaShape> {
        const note = this.notesDao.createNote(noteData);
        return note;
    }
}

export default new NoteServices(new NoteDAO());
