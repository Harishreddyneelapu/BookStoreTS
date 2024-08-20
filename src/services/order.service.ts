import { Types } from 'mongoose';
import Cart from '../models/cart.model';
import Order from '../models/order.model';
import { IOrder } from '../interfaces/order.interface';

export const getOrderDetails = async (_id: Types.ObjectId): Promise<IOrder> => {
  try {
    // Find the cart by user ID
    const cart = await Cart.findOne({ cartBy: _id }).exec();

    if (!cart) {
      throw new Error('Cart not found');
    }

    // Find the order by user ID
    let order = await Order.findOne({ orderBy: _id }).exec();

    if (!order) {
      // If no order exists, create a new one
      order = await Order.create({
        orderBy: _id,
        books: cart.books,
        isPurchased: true,
        orderPlacedDate: new Date() // Set orderPlacedDate to current date
      });
    } else {
      // If order exists, update it with the books from the cart
      order.books.push(...cart.books);
      order.isPurchased = true;
    }

    // Save the updated or newly created order
    await order.save();

    // Clear the cart
    cart.books = [];
    cart.cartTotal = 0;
    await cart.save();

    return order;
  } catch (error) {
    console.error('Error getting order details:', error);
    throw error;
  }
};
export function getWishlistDetails(userIdObjectId: Types._ObjectId) {
    throw new Error('Function not implemented.');
}

export function addToWishlist(userIdObjectId: Types._ObjectId, bookIdObjectId: Types._ObjectId) {
    throw new Error('Function not implemented.');
}

export function removeFromWishlist(userIdObjectId: Types._ObjectId, bookIdObjectId: Types._ObjectId) {
    throw new Error('Function not implemented.');
}

