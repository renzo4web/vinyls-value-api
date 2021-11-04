import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { User } from '../entities/user.entity';
import { UsersService } from '../users.service';

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    //@ts-ignore
    const { userId } = req.session || {};

    if (userId) {
      console.log('userId', userId);
      const user = await this.usersService.findOne(userId);
      //@ts-ignore
      req.currentUser = user;
    }

    return next();
  }
}
