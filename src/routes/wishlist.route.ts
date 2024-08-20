import express from 'express';
import * as WishlistController from '../controllers/wishlist.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('',userAuth, WishlistController.getWishlistDetails);

router.post('/add/:_id',userAuth, WishlistController.addToWishlist);

router.post('/remove/:_id', userAuth, WishlistController.removeFromWishlist);

export default router;
