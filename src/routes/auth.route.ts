import { Router } from 'express';
import { AuthController } from '@controllers/auth.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class AuthRoute implements Routes {
  public path = '/';
  public router = Router();
  public authRoute = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}register
    `,
      ValidationMiddleware(CreateUserDto),
      this.authRoute.signUp,
    );
    this.router.post(`${this.path}login`, ValidationMiddleware(CreateUserDto), this.authRoute.logIn);
    this.router.post(`${this.path}logout`, AuthMiddleware, this.authRoute.logOut);
  }
}
