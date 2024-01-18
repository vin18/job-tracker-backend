import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { AuthService } from '@services/auth.service';
import { NODE_ENV, EXPIRES_IN } from '@/config';

export class AuthController {
  public authController = Container.get(AuthService);

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.body;
      const signUpUserData: User = await this.authController.signup(userData);

      res.status(201).json({ data: signUpUserData, message: 'User signed up' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.body;
      const { cookie, findUser } = await this.authController.login(userData);

      const oneDay = 1000 * 60 * 60 * 24;
      res.cookie('token', cookie, {
        httpOnly: true,
        secure: NODE_ENV === 'production',
        expires: new Date(Date.now() + parseInt(EXPIRES_IN) * oneDay),
      });

      res.status(200).json({ data: findUser, message: 'User logged in' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.authController.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'User logged out' });
    } catch (error) {
      next(error);
    }
  };
}
