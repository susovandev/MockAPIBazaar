import {
    ICreateNoteDto,
    INoteSchemaShape,
    IUpdateNoteDto,
} from '@/interfaces/index.js';
import { Note } from '@/models/note.model.js';

/**
 * Data Access Object (DAO) for Note model.
 * Handles all database operations related to notes.
 */
export class NoteDAO {
    /**
     * Creates a new note document in the database.
     * @param noteData - Data required to create the note.
     * @returns {Promise<INoteSchemaShape>} - A promise that resolves to the newly created note document.
     */
    async createNote(noteData: ICreateNoteDto): Promise<INoteSchemaShape> {
        return await Note.create(noteData);
    }

    /**
     * Retrieves a paginated list of notes from the database.
     * @param  page - The page number (0-based index).
     * @param  limit - The number of notes to retrieve per page.
     * @returns {Promise<INoteSchemaShape[]>} - A promise resolving to an array of note documents.
     * @example
     * // Get first 10 notes (page = 0, limit = 10)
     * getAllNotes(0, 10);
     */
    async getAllNotes(
        page: number,
        limit: number,
    ): Promise<INoteSchemaShape[]> {
        const skip = page * limit; // Calculate number of documents to skip
        return await Note.find()
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .lean(); // Convert Mongoose documents to plain JS objects
    }

    /**
     * Retrieves the total count of note documents from the database.
     * @returns {Promise<number>} - A promise resolving to the total number of notes.
     */
    async getTotalNotesCount(): Promise<number> {
        return await Note.countDocuments();
    }

    /**
     * Finds a note by its ID.
     * @param noteId - The ID of the note to retrieve.
     * @returns {Promise<INoteSchemaShape | null>} - A promise that resolves to the note if found, otherwise null.
     */
    async getNoteById(noteId: string): Promise<INoteSchemaShape | null> {
        return await Note.findById(noteId);
    }

    /**
     * Updates a note by its ID with the given data.
     * @param noteId - The ID of the note to update.
     * @param noteData - The fields to update in the note.
     * @returns {Promise<INoteSchemaShape | null>} - A promise that resolves to the updated note or null if not found.
     */
    async updateNoteById(
        noteId: string,
        noteData: Partial<IUpdateNoteDto>,
    ): Promise<INoteSchemaShape | null> {
        return await Note.findByIdAndUpdate({ _id: noteId }, noteData, {
            new: true, // Return the updated document
        }).lean(); // Convert Mongoose document to plain JS object
    }

    /**
     * Deletes a note by its ID.
     * @param noteId - The ID of the note to delete.
     * @returns {Promise<INoteSchemaShape | null>} -  A promise that resolves to the deleted note or null if not found.
     */
    async deleteNoteById(noteId: string): Promise<INoteSchemaShape | null> {
        return await Note.findByIdAndDelete(noteId).lean(); // Convert Mongoose document to plain JS object
    }
}

export const noteDAO = new NoteDAO();
