import express, { Router } from 'express';
import * as CartController from '../controllers/cart.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router: Router = express.Router();


router.get('', userAuth, CartController.getCartDetails);

router.post('/add/:_id', userAuth, CartController.addToCart);

router.post('/remove/:_id', userAuth, CartController.removeFromCart);

router.put('/update/:_id', userAuth, CartController.updateCart);

export default router;
