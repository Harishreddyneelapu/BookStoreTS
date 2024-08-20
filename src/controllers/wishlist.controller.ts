import HttpStatus from 'http-status-codes';
import * as WishlistService from '../services/order.service';
import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { CustomRequest } from '../middlewares/auth.middleware';

export const getWishlistDetails = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId as string; // Ensure userId is available as a string
    if (!userId) {
      res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'User ID is required'
      });
      return;
    }

    const userIdObjectId = new Types.ObjectId(userId); // Convert to ObjectId
    const data = await WishlistService.getWishlistDetails(userIdObjectId);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      success: true,
      message: 'Wishlist fetched successfully',
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

export const addToWishlist = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId as string;
    const bookId = req.params._id as string;

    if (!userId || !bookId) {
      res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'User ID and Book ID are required'
      });
      return;
    }

    const userIdObjectId = new Types.ObjectId(userId); // Convert to ObjectId
    const bookIdObjectId = new Types.ObjectId(bookId); // Convert to ObjectId

    const data = await WishlistService.addToWishlist(userIdObjectId, bookIdObjectId);
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Book added to wishlist successfully',
      data: data
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `${error}`
    });
  }
};

export const removeFromWishlist = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId as string;
    const bookId = req.params._id as string;

    if (!userId || !bookId) {
      res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'User ID and Book ID are required'
      });
      return;
    }

    const userIdObjectId = new Types.ObjectId(userId); // Convert to ObjectId
    const bookIdObjectId = new Types.ObjectId(bookId); // Convert to ObjectId

    const data = await WishlistService.removeFromWishlist(userIdObjectId, bookIdObjectId);
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Book removed from wishlist successfully',
      data: data
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `${error}`
    });
  }
};
