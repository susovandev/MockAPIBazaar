import { NoteDAO } from '@/dao/index.js';
import {
    ICreateNoteDto,
    INoteSchemaShape,
    IUpdateNoteDto,
} from '@/interfaces/index.js';
import { NotFoundException } from '@/utils/customErrors.js';
import { isValidMongoObjectId } from '@/utils/isValidObjectId.js';

/**
 * Service class for handling note-related business logic.
 */
class NoteServices {
    /**
     * Constructs a new NoteServices instance.
     * @param notesDAO - The NoteDAO instance for database operations.
     */
    constructor(private readonly notesDAO: NoteDAO) {}

    /**
     * Check if the note ID is valid.
     * @param noteId - Note ID.
     * @throws NotFoundException - If the note ID is invalid.
     */
    private checkNoteIdOrThrow(noteId: string): void {
        if (!isValidMongoObjectId(noteId)) {
            throw new NotFoundException('Invalid note id');
        }
    }

    /**
     * Check if the note exists.
     * @param note - The note to check.
     * @throws NotFoundException - If the note is not found.
     */
    private checkNoteOrThrow(
        note: INoteSchemaShape | null,
    ): asserts note is INoteSchemaShape {
        if (!note) {
            throw new NotFoundException('Note not found');
        }
    }

    /**
     * Create a new note.
     * @param noteData - Data to create the note.
     * @returns The newly created note.
     */
    async createNote(noteData: ICreateNoteDto): Promise<INoteSchemaShape> {
        // create the note
        return await this.notesDAO.createNote(noteData);
    }

    /**
     * Get a note by its ID.
     * @param noteId - Note ID.
     * @returns The requested note.
     * @throws NotFoundException - If the note is not found or ID is invalid.
     */
    async getNoteById(noteId: string): Promise<INoteSchemaShape | null> {
        // check if noteId is valid
        this.checkNoteIdOrThrow(noteId);

        // check if note exists
        const note = await this.notesDAO.getNoteById(noteId);
        this.checkNoteOrThrow(note);

        return note;
    }

    /**
     * Update a note by its ID.
     * @param noteId - Note ID.
     * @param noteData - Updated note data.
     * @returns The updated note.
     * @throws NotFoundException - If the note is not found or ID is invalid.
     */
    async updateNoteById(
        noteId: string,
        noteData: IUpdateNoteDto,
    ): Promise<INoteSchemaShape> {
        // check if noteId is valid
        this.checkNoteIdOrThrow(noteId);

        // check if note exists
        const note = await this.notesDAO.updateNoteById(noteId, noteData);
        this.checkNoteOrThrow(note);

        return note;
    }

    /**
     * Delete a note by its ID.
     * @param noteId - Note ID.
     * @returns Void.
     * @throws NotFoundException - If the note is not found or ID is invalid.
     */
    async deleteNoteById(noteId: string): Promise<void> {
        // check if noteId is valid
        this.checkNoteIdOrThrow(noteId);

        // check if note exists
        const note = await this.notesDAO.deleteNoteById(noteId);
        this.checkNoteOrThrow(note);
    }

    // ----------- Extra Feature Methods -----------

    /**
     * Toggle the pinned status of a note.
     * @param noteId - Note ID.
     * @returns The updated note with toggled pin status.
     * @throws NotFoundException - If the note is not found or ID is invalid.
     */
    async togglePinNote(noteId: string): Promise<INoteSchemaShape> {
        // check if noteId is valid
        this.checkNoteIdOrThrow(noteId);

        // check if note exists
        const note = await this.notesDAO.getNoteById(noteId);
        this.checkNoteOrThrow(note);

        // toggle the pinned status
        const updatedNote = await this.notesDAO.updateNoteById(noteId, {
            isPinned: !note.isPinned,
        });
        return updatedNote!; // ! is used to assert that the note is not null
    }

    /**
     * Toggle the archived status of a note.
     * @param noteId - Note ID.
     * @returns The updated note with toggled archive status.
     * @throws NotFoundException - If the note is not found or ID is invalid.
     */
    async toggleArchiveNote(noteId: string): Promise<INoteSchemaShape> {
        // check if noteId is valid
        this.checkNoteIdOrThrow(noteId);

        // check if note exists
        const note = await this.notesDAO.getNoteById(noteId);
        this.checkNoteOrThrow(note);

        // toggle the archived status
        const updatedNote = await this.notesDAO.updateNoteById(noteId, {
            isArchived: !note.isArchived,
        });
        return updatedNote!; // ! is used to assert that the note is not null
    }

    /**
     * Toggle the trashed status of a note.
     * @param noteId - Note ID.
     * @returns The updated note with toggled trash status.
     * @throws NotFoundException - If the note is not found or ID is invalid.
     */
    async toggleTrashNote(noteId: string): Promise<INoteSchemaShape> {
        // check if noteId is valid
        this.checkNoteIdOrThrow(noteId);

        // check if note exists
        const note = await this.notesDAO.getNoteById(noteId);
        this.checkNoteOrThrow(note);

        // toggle the trashed status
        const updatedNote = await this.notesDAO.updateNoteById(noteId, {
            isTrashed: !note.isTrashed,
        });
        return updatedNote!; // ! is used to assert that the note is not null
    }

    /**
     * Change the color of a note.
     * @param noteId - Note ID.
     * @param color - New color label for the note.
     * @returns The updated note with new color.
     * @throws NotFoundException - If the note is not found or ID is invalid.
     */
    async changeNoteColor(
        noteId: string,
        colorLabel: string,
    ): Promise<INoteSchemaShape> {
        // check if noteId is valid
        this.checkNoteIdOrThrow(noteId);

        // check if note exists
        const note = await this.notesDAO.updateNoteById(noteId, {
            colorLabel: colorLabel,
        });
        this.checkNoteOrThrow(note);

        return note;
    }
    /**
     * Set a reminder for a note.
     * @param noteId - Note ID.
     * @param date - Date for the reminder.
     * @returns The updated note with new reminder.
     * @throws NotFoundException - If the note is not found or ID is invalid.
     */

    async setReminderNote(
        noteId: string,
        date: Date,
    ): Promise<INoteSchemaShape> {
        // check if noteId is valid
        this.checkNoteIdOrThrow(noteId);

        // check if note exists
        const note = await this.notesDAO.updateNoteById(noteId, {
            reminderAt: date,
        });
        this.checkNoteOrThrow(note);

        return note;
    }
}

export default new NoteServices(new NoteDAO());
