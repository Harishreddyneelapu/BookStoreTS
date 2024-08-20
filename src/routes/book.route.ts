import express from 'express';
import * as BooksController from '../controllers/book.controller';
import { checkRole, userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', BooksController.getAllBooks);

router.get('/:_id', BooksController.getBookById);

router.put('/:_id', userAuth, checkRole, BooksController.updateBookById);

router.delete('/:_id', userAuth, checkRole, BooksController.deleteBookById);

export default router;
