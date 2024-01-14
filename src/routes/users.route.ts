import { Router } from 'express';
import { UserController } from '@controllers/users.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { authorizePermissions } from '@/middlewares/auth.middleware';

export class UserRoute implements Routes {
  public path = '/users';
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, this.user.getUserById);
    this.router.get(`${this.path}/admin/stats`, authorizePermissions('admin'), this.user.adminStats);
    this.router.put(`${this.path}/:id`, ValidationMiddleware(CreateUserDto, true), this.user.updateUser);
  }
}
