import { Schema, model } from 'mongoose';
import { ICart } from '../interfaces/cart.interface';

const cartSchema = new Schema<ICart>(
  {
    cartBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    books: [
      {
        bookId: {
          type: Schema.Types.ObjectId,
          ref: 'Book',
          required: true
        },
        bookName: {
          type: String,
          required: true
        },
        description: {
          type: String,
          required: true
        },
        author: {
          type: String,
          required: true
        },
        bookImage: {
          type: String,
          default: null
        },
        price: {
          type: Number,
          required: true
        },
        discountPrice: {
          type: Number,
          required: true
        },
        quantity: {
          type: Number,
          default: 1,
          required: true
        }
      }
    ],
    cartTotal: {
      type: Number,
      required: true
    },
    isPurchased: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default model<ICart>('Cart', cartSchema);
