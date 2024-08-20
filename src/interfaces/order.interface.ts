import { Document, Types } from 'mongoose';

export interface IOrderBook {
  bookId: Types.ObjectId;
  bookName: string;
  description: string;
  author: string;
  bookImage?: string | null;
  price: number;
  discountPrice: number;
  quantity: number;
}

export interface IOrder extends Document {
  orderBy: Types.ObjectId;
  books: IOrderBook[];
  isPurchased: boolean;
  orderPlacedDate: Date;
}
