import express from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import * as CustomerController from '../controllers/customerDetails.controller';

const router = express.Router();

router.post('',userAuth, CustomerController.getCustomerDetails);

export default router;
