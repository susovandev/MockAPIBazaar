import { TCreateNoteDTO, TUpdateNoteDTO } from '@/dtos/index.js';
import { NoteDAO } from '@/dao/index.js';
import { INoteSchemaShape } from '@/interfaces/note.interface.js';
import { NotFoundException } from '@/utils/customErrors.js';
import { isValidMongoObjectId } from '@/utils/isValidObjectId.js';

class NoteServices {
    constructor(private readonly notesDao: NoteDAO) {}
    async createNote(noteData: TCreateNoteDTO): Promise<INoteSchemaShape> {
        const note = this.notesDao.createNote(noteData);
        return note;
    }

    async getNoteById(noteId: string): Promise<INoteSchemaShape> {
        if (!isValidMongoObjectId(noteId)) {
            throw new NotFoundException('Invalid note id');
        }

        const note = await this.notesDao.getNoteById(noteId);

        if (!note) {
            throw new NotFoundException('Note not found');
        }
        return note;
    }

    async updateNoteById(
        noteId: string,
        noteData: TUpdateNoteDTO,
    ): Promise<INoteSchemaShape> {
        if (!isValidMongoObjectId(noteId)) {
            throw new NotFoundException('Invalid note id');
        }

        const note = await this.notesDao.updateNoteById(noteId, noteData);

        if (!note) {
            throw new NotFoundException('Note not found');
        }
        return note;
    }

    async deleteNoteById(noteId: string) {
        if (!isValidMongoObjectId(noteId)) {
            throw new NotFoundException('Invalid note id');
        }

        const note = await this.notesDao.deleteNoteById(noteId);

        if (!note) {
            throw new NotFoundException('Note not found');
        }
    }

    // Extra features
    async togglePinNote(noteId: string): Promise<INoteSchemaShape | null> {
        if (!isValidMongoObjectId(noteId)) {
            throw new NotFoundException('Invalid note id');
        }
        const note = await this.notesDao.getNoteById(noteId);
        if (!note) {
            throw new NotFoundException('Note not found');
        }
        return await this.notesDao.updateNoteById(noteId, {
            isPinned: !note.isPinned,
        });
    }
    
    async toggleArchiveNote(noteId: string): Promise<INoteSchemaShape | null> {
        if (!isValidMongoObjectId(noteId)) {
            throw new NotFoundException('Invalid note id');
        }
        const note = await this.notesDao.getNoteById(noteId);
        if (!note) {
            throw new NotFoundException('Note not found');
        }
        return await this.notesDao.updateNoteById(noteId, {
            isArchived: !note.isArchived,
        });
    }
}

export default new NoteServices(new NoteDAO());
