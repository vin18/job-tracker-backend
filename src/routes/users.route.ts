import { Router } from 'express';
import { UserController } from '@controllers/users.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware, authorizePermissions } from '@/middlewares/auth.middleware';

export class UserRoute implements Routes {
  public path = '/users';
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/me`, AuthMiddleware, this.user.getLoggedInUser);
    this.router.get(`${this.path}/admin/stats`, authorizePermissions('admin'), this.user.adminStats);
    this.router.patch(`${this.path}/:id`, ValidationMiddleware(CreateUserDto, true), AuthMiddleware, this.user.updateUser);
  }
}
