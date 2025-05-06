import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';

export const Auth = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const user = request.user;
    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return user;
    } else {
      throw new HttpException('Unauthorized', 401);
    }
  },
);
