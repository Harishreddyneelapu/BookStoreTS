import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import * as CustomerService from '../services/customerDetails.service';
import { CustomRequest } from '../middlewares/auth.middleware'; // Adjust the path as needed
import { Types } from 'mongoose';

export const getCustomerDetails = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'User ID is required'
      });
      return;
    }

    
    const userIdObjectId = new Types.ObjectId(req.userId);

    const data = await CustomerService.getCustomerDetails(userIdObjectId);
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Customer details fetched successfully',
      data: data
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `${error}`
    });
  }
};
