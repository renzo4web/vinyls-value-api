import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';
import { NextFunction } from 'express';
import { User } from '../entities/user.entity';
import { UsersService } from '../users.service';

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
      session: {
        userId?: number;
      };
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: Request, _res: Response, next: NextFunction) {
    const { userId } = req.session || {};

    if (userId) {
      console.log('userId', userId);
      const user = await this.usersService.findOne(userId);
      req.currentUser = user;
    }

    return next();
  }
}
