import { NoteDAO } from '@/dao/index.js';
import {
    ICreateNoteDto,
    INoteSchemaShape,
    IUpdateNoteDto,
} from '@/interfaces/index.js';
import {
    BadRequestException,
    NotFoundException,
} from '@/utils/customErrors.js';
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
     * @returns {Promise<INoteSchemaShape>} The newly created note.
     */
    async createNote(noteData: ICreateNoteDto): Promise<INoteSchemaShape> {
        // create the note
        return await this.notesDAO.createNote(noteData);
    }

    /**
     * Get all notes.
     * @param page - The page number (0-based index).
     * @param limit - The number of notes to retrieve per page..
     * @returns The newly created note.
     */
    async getAllNotes(page: number, limit: number) {
        // check if page and limit are valid
        if (page < 0)
            throw new BadRequestException('Page number must be non-negative');

        if (limit < 0 || limit > 100)
            throw new BadRequestException('Limit must be between 1 and 100');

        // get list of notes
        const notes = await this.notesDAO.getAllNotes(page, limit);
        // get total number of notes
        const totalNotes = await this.notesDAO.getTotalNotesCount();

        return {
            notes, // list of notes
            pagination: {
                // pagination data
                currentPage: page,
                limit,
                totalNotes,
                totalPages: Math.ceil(totalNotes / limit),
                hasNextPage: page < Math.ceil(totalNotes / limit) - 1,
                hasPrevPage: page > 0,
            },
        };
    }

    /**
     * Get a note by its ID.
     * @param noteId - Note ID.
     * @returns {Promise<INoteSchemaShape>} The requested note.
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
     * @returns {Promise<INoteSchemaShape>} The updated note.
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
     * @returns {Promise<void>} Void.
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
     * Soft delete a note by its ID.
     * @param noteId - Note ID.
     * @returns {Promise<INoteSchemaShape>} The soft-deleted note.
     * @throws NotFoundException - If the note is not found or ID is invalid.
     */
    async softDelete(noteId: string): Promise<INoteSchemaShape> {
        // check if noteId is valid
        this.checkNoteIdOrThrow(noteId);

        // check if note exists
        const note = await this.notesDAO.updateNoteById(noteId, {
            isTrashed: true,
        });
        this.checkNoteOrThrow(note);

        return note;
    }

    /**
     * Toggle the pinned status of a note.
     * @param noteId - Note ID.
     * @returns {Promise<INoteSchemaShape>} The updated note with toggled pin status.
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
     * @returns {Promise<INoteSchemaShape>} The updated note with toggled archive status.
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
     * @returns {Promise<INoteSchemaShape>} The updated note with toggled trash status.
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
     * @returns {Promise<INoteSchemaShape>} The updated note with new color.
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
     * @returns {Promise<INoteSchemaShape>} The updated note with new reminder.
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
