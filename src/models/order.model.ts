import { Schema, model } from 'mongoose';
import { IOrder, IOrderBook } from '../interfaces/order.interface';


const orderBookSchema = new Schema<IOrderBook>({
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
});


const orderSchema = new Schema<IOrder>({
  orderBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  books: [orderBookSchema],
  isPurchased: {
    type: Boolean,
    default: false
  },
  orderPlacedDate: {
    type: Date,
    default: Date.now
  }
});

export default model<IOrder>('Order', orderSchema);
