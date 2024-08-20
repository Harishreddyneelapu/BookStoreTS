import { Types } from 'mongoose';
import { ICart, ICartBook } from '../interfaces/cart.interface';
import Cart from '../models/cart.model';
import Book from '../models/book.model';

export const getCartDetails = async (_id: Types.ObjectId): Promise<ICart | null> => {
  return Cart.findOne({ cartBy: _id }).exec();
};

export const addToCart = async (cartBy: Types.ObjectId, book_id: Types.ObjectId): Promise<ICart> => {
  const book = await Book.findById(book_id).exec();
  if (!book) {
    throw new Error('Book not found with this _id');
  }

  let cart = await Cart.findOne({ cartBy }).exec();
  if (!cart) {
    const newCart = await Cart.create({
      cartBy,
      books: [{
        bookId: book._id,
        bookName: book.bookName,
        description: book.description,
        author: book.author,
        bookImage: book.bookImage,
        price: book.price,
        discountPrice: book.discountPrice,
        quantity: 1
      }],
      cartTotal: book.price,
      isPurchased: false
    });
    return newCart;
  } else {
    const existingBook = cart.books.find(b => b.bookId.equals(book._id));
    if (existingBook) {
      existingBook.quantity += 1;
    } else {
      cart.books.push({
        bookId: book._id,
        bookName: book.bookName,
        description: book.description,
        author: book.author,
        bookImage: book.bookImage,
        price: book.price,
        discountPrice: book.discountPrice,
        quantity: 1
      });
    }
    cart.cartTotal += book.price;
    await cart.save();
    return cart;
  }
};

export const removeFromCart = async (cartBy: Types.ObjectId, book_id: Types.ObjectId): Promise<ICart> => {
  const cart = await Cart.findOne({ cartBy }).exec();
  if (!cart) {
    throw new Error('Cart is not created yet.');
  }

  const bookIndex = cart.books.findIndex(b => b.bookId.equals(book_id));
  if (bookIndex === -1) {
    throw new Error('Book is not in the cart');
  }

  const book = cart.books[bookIndex];
  book.quantity -= 1;
  if (book.quantity === 0) {
    cart.books.splice(bookIndex, 1);
  }
  cart.cartTotal -= book.price;
  await cart.save();
  return cart;
};

export const updateCart = async (cartBy: Types.ObjectId, book_id: Types.ObjectId, body: { quantity: number }): Promise<ICart | null> => {
  const cart = await Cart.findOne({ cartBy }).exec();
  if (!cart) {
    throw new Error('Cart is not created yet.');
  }

  const bookIndex = cart.books.findIndex(b => b.bookId.equals(book_id));
  if (bookIndex === -1) {
    throw new Error('Book is not in the cart');
  }

  const book = cart.books[bookIndex];
  const priceDifference = (body.quantity - book.quantity) * book.price;
  book.quantity = body.quantity;
  cart.cartTotal += priceDifference;
  return cart.save();
};
