import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { UsersService } from '../users.service';

//export function Serialize(dto: ClassConstructor) {
//return UseInterceptors(new SerializeInterceptor(dto));
//}

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // Run something before a request is handled
    // by the request handler
    //
    const req = context.switchToHttp().getRequest();
    const { userId } = req.session;
    console.log('INTERCEPTOR', userId);

    return handler.handle().pipe(
      map((data: any) => {
        // run something before the response is sent out
        console.log(data);
      }),
    );
  }
}
