import express from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import * as OrderController from '../controllers/order.controller';

const router = express.Router();

router.post('',userAuth, OrderController.getOrderDetails);

export default router;
