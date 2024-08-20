import Book from '../models/book.model';
import { IBook } from '../interfaces/book.interface';

export const getAllBooks = async (): Promise<IBook[]> => {
  const data = await Book.find();
  return data;
};

export const getBookById = async (_id: string): Promise<IBook | null> => {
  const data = await Book.findById(_id);
  return data;
};

export const updateBookById = async (
  _id: string,
  body: Partial<IBook>
): Promise<IBook | null> => {
  const data = await Book.findByIdAndUpdate(
    { _id },
    body,
    { new: true }
  );
  return data;
};

export const deleteBookById = async (_id: string): Promise<string> => {
  await Book.findByIdAndDelete(_id);
  return '';
};
