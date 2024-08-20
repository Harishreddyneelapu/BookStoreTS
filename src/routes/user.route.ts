import express, { Router } from 'express';
import * as userController from '../controllers/user.controller';
import * as validator from '../validators/user.validator';
import { roleAdmin, roleUser } from '../middlewares/role.middleware';

const router: Router = express.Router();

// Route for user registration with roleUser middleware
router.post(
  '/userRegister',
  validator.newValidatorRegister,
  roleUser,
  userController.newRegister
);

// Route for admin registration with roleAdmin middleware
router.post(
  '/adminRegister',
  validator.newValidatorRegister,
  roleAdmin,
  userController.newRegister
);

// Route for login
router.post('/login', validator.login, userController.login);

export default router;
