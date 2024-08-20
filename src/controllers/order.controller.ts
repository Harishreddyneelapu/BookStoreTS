import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import * as OrderService from '../services/order.service';
import { CustomRequest } from '../middlewares/auth.middleware'; // Adjust the path as needed
import { Types } from 'mongoose';

export const getOrderDetails = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        success: false,
        message: 'User ID is required'
      });
      return;
    }

    // Convert userId to ObjectId
    const userIdObjectId = new Types.ObjectId(req.userId);

    const data = await OrderService.getOrderDetails(userIdObjectId);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      success: true,
      message: 'Orders fetched successfully',
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
