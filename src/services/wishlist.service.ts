import { Types } from 'mongoose';
import Wishlist from '../models/wishlist.model';
import Book from '../models/book.model';
import { IWishlist } from '../interfaces/wishlist.interface'; // Adjust the path as needed

export const getWishlistDetails = async (_id: Types.ObjectId): Promise<IWishlist | null> => {
  const data = await Wishlist.findOne({ wishlistBy: _id }).exec();
  return data;
};

export const addToWishlist = async (wishlistBy: Types.ObjectId, book_id: Types.ObjectId): Promise<IWishlist> => {
  const book = await Book.findById(book_id).exec();
  if (!book) {
    throw new Error('Book not found with this _id');
  }

  let wishlist = await Wishlist.findOne({ wishlistBy }).exec();
  if (!wishlist) {
    wishlist = await Wishlist.create({
      wishlistBy: wishlistBy,
      books: [{
        bookId: book._id,
        bookName: book.bookName,
        description: book.description,
        author: book.author,
        bookImage: book.bookImage,
        price: book.price,
        discountPrice: book.discountPrice
      }]
    });
  } else {
    const existingBook = wishlist.books.find(b => b.bookId.equals(book._id));
    if (!existingBook) {
      wishlist.books.push({
        bookId: book._id,
        bookName: book.bookName,
        description: book.description,
        author: book.author,
        bookImage: book.bookImage,
        price: book.price,
        discountPrice: book.discountPrice
      });
    }
  }

  await wishlist.save();
  return wishlist;
};

export const removeFromWishlist = async (wishlistBy: Types.ObjectId, book_id: Types.ObjectId): Promise<IWishlist> => {
  const wishlist = await Wishlist.findOne({ wishlistBy }).exec();
  if (!wishlist) {
    throw new Error('Wishlist is not created yet');
  }

  const bookIndex = wishlist.books.findIndex(b => b.bookId.equals(book_id));
  if (bookIndex === -1) {
    throw new Error('Book is not in the wishlist');
  }

  wishlist.books.splice(bookIndex, 1);
  await wishlist.save();
  return wishlist;
};
