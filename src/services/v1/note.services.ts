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
     * Retrieves all notes based on pagination and optional filters such as search, priority, tags, colorLabel, and sorting.
     *
     * @param page - The page number (0-based index).
     * @param limit - The number of notes to retrieve per page.
     * @param filters - Object containing filter and sort options:
     *   - search: Search keyword to match against title or content.
     *   - priority: Filter notes by their priority (low, medium, high).
     *   - tags: Filter notes by matching any tag.
     *   - colorLabel: Filter notes by color label.
     *   - sortBy: Field to sort the notes by (default: createdAt).
     *   - order: Sort order ('asc' or 'desc').
     * @returns An object containing the list of notes and pagination details.
     */
    async getAllNotes(
        page: number,
        limit: number,
        filters: {
            search?: string;
            priority?: string;
            tags?: string[];
            colorLabel?: string;
            sortBy?: string;
            order?: 'asc' | 'desc';
        },
    ): Promise<{
        notes: INoteSchemaShape[];
        pagination: {
            currentPage: number;
            limit: number;
            totalNotes: number;
            totalPages: number;
            hasNextPage: boolean;
            hasPrevPage: boolean;
        };
    }> {
        // Validate page number
        if (page < 0)
            throw new BadRequestException('Page number must be non-negative');

        // Validate limit range
        if (limit < 0 || limit > 100)
            throw new BadRequestException('Limit must be between 1 and 100');

        // Initialize query object to build dynamic MongoDB query
        const query: Record<string, unknown> = {};

        // Add priority filter if present
        if (filters.priority) query.priority = filters.priority;

        // Add color label filter if present
        if (filters.colorLabel) query.colorLabel = filters.colorLabel;

        // Add tags filter using $in operator (matches any of the provided tags)
        if (filters.tags?.length) query.tags = { $in: filters.tags };

        // Add full-text search using case-insensitive regex on title or content
        if (filters.search) {
            query.$or = [
                { title: { $regex: filters.search, $options: 'i' } },
                { content: { $regex: filters.search, $options: 'i' } },
            ];
        }
        // Sort config
        const sort: Record<string, 1 | -1> = {
            [filters.sortBy || 'createdAt']: filters.order === 'asc' ? 1 : -1,
        };
        // get list of notes
        const notes = await this.notesDAO.getAllNotes(page, limit, query, sort);
        // get total number of notes
        const totalNotes = await this.notesDAO.getTotalNotesCount(query);

        return {
            notes, // list of notes
            pagination: {
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
