import { Document, Types } from 'mongoose';

export interface ICartBook {
  bookId: Types.ObjectId;
  bookName: string;
  description: string;
  author: string;
  bookImage?: string | null;
  price: number;
  discountPrice: number;
  quantity: number;
}

export interface ICart extends Document {
  cartBy: Types.ObjectId;
  books: ICartBook[];
  cartTotal: number;
  isPurchased: boolean;
}
