import { Document, Types } from 'mongoose';

export interface IWishlistBook {
  bookId: Types.ObjectId; // Change to ObjectId
  bookName: string;
  description: string;
  author: string;
  bookImage?: string | null;
  price: number;
  discountPrice: number;
}

export interface IWishlist extends Document {
  wishlistBy: Types.ObjectId; // Change to ObjectId
  books: IWishlistBook[];
  createdAt?: Date;
  updatedAt?: Date;
}
