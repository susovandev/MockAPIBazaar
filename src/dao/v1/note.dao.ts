import { ICreateNoteDto, IUpdateNoteDto } from '@/interfaces/index.js';
import { Note } from '@/models/note.model.js';

/**
 * Data Access Object (DAO) for Note model.
 * Handles all database operations related to notes.
 */
export class NoteDAO {
    /**
     * Creates a new note document in the database.
     * @param noteData - Data required to create the note.
     * @returns A promise that resolves to the newly created note document.
     */
    async createNote(noteData: ICreateNoteDto) {
        return await Note.create(noteData);
    }

    /**
     * Finds a note by its ID.
     * @param noteId - The ID of the note to retrieve.
     * @returns A promise that resolves to the note if found, otherwise null.
     */
    async getNoteById(noteId: string) {
        return await Note.findById(noteId);
    }

    /**
     * Updates a note by its ID with the given data.
     * @param noteId - The ID of the note to update.
     * @param noteData - The fields to update in the note.
     * @returns A promise that resolves to the updated note or null if not found.
     */
    async updateNoteById(noteId: string, noteData: Partial<IUpdateNoteDto>) {
        return await Note.findByIdAndUpdate({ _id: noteId }, noteData, {
            new: true, // Return the updated document
        }).lean(); // Convert Mongoose document to plain JS object
    }

    /**
     * Deletes a note by its ID.
     * @param noteId - The ID of the note to delete.
     * @returns A promise that resolves to the deleted note or null if not found.
     */
    async deleteNoteById(noteId: string) {
        return await Note.findByIdAndDelete(noteId).lean();
    }
}

export const noteDAO = new NoteDAO();
