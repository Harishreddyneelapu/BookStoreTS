import { Schema, model } from 'mongoose';
import { IWishlist, IWishlistBook } from '../interfaces/wishlist.interface';

const wishlistBookSchema = new Schema<IWishlistBook>({
  bookId: {
    type: Schema.Types.ObjectId, // Use ObjectId here
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
  }
});

const wishlistSchema = new Schema<IWishlist>({
  wishlistBy: {
    type: Schema.Types.ObjectId, // Use ObjectId here
    ref: 'User',
    required: true
  },
  books: [wishlistBookSchema]
}, {
  timestamps: true
});

export default model<IWishlist>('Wishlist', wishlistSchema);
