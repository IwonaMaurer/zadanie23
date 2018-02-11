import { Router } from 'express';
import * as NoteController from '../controllers/note.controller';

const router = new Router();

// Add a new Note
router.route('/notes').post(NoteController.addNote);

// Delete a single note
router.route('/notes/:noteId').delete(NoteController.deleteNote);

// Edit a note content by noteId
router.route('/notes').put(NoteController.editNoteContent);

export default router;
