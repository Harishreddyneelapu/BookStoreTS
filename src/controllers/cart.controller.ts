import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import * as CartService from '../services/cart.service';
import { CustomRequest } from '../middlewares/auth.middleware';
import { Types } from 'mongoose';

export const getCartDetails = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'User ID is required'
      });
      return;
    }
    const id = new Types.ObjectId(req.userId)
    const data = await CartService.getCartDetails(id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      success: true,
      message: 'Cart fetched successfully',
      data: data
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      success: false,
      message: `${error}`
    });
  }
};

export const addToCart = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const bookId = req.params._id;

    if (!userId || !bookId) {
      res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'User ID and Book ID are required'
      });
      return;
    }
    const id = new Types.ObjectId(req.userId)
    const book_id = new Types.ObjectId(bookId)
    const data = await CartService.addToCart(id, book_id);
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Book added to cart successfully',
      data: data
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `${error}`
    });
  }
};

export const removeFromCart = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const bookId = req.params._id;

    if (!userId || !bookId) {
      res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'User ID and Book ID are required'
      });
      return;
    }
    const id = new Types.ObjectId(req.userId)
    const book_id = new Types.ObjectId(bookId)
    const data = await CartService.removeFromCart(id, book_id);
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Book removed from cart successfully',
      data: data
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `${error}`
    });
  }
};

export const updateCart = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const bookId = req.params._id;
    const { quantity } = req.body;

    if (!userId || !bookId || quantity === undefined) {
      res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'User ID, Book ID, and quantity are required'
      });
      return;
    }
    const id = new Types.ObjectId(req.userId)
    const book_id = new Types.ObjectId(bookId)
    const data = await CartService.updateCart(id, book_id, { quantity });
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Book updated in cart successfully',
      data: data
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `${error}`
    });
  }
};
