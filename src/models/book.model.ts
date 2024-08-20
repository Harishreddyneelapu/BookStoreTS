import { Schema, model } from 'mongoose';
import { IBook } from '../interfaces/book.interface';

const bookSchema = new Schema<IBook>(
  {
    description: {
      type: String,
      required: true
    },
    discountPrice: {
      type: Number,
      required: true
    },
    bookImage: {
      type: String,
      default: null
    },
    admin_user_id: {
      type: String
    },
    bookName: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default model<IBook>('Book', bookSchema);
