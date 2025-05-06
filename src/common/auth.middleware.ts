import { Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private prismaService: PrismaService) {}

  async use(req: any, res: any, next: (error?: any) => void) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const token = req.headers['authorization'] as string;

    if (token) {
      const user = await this.prismaService.user.findFirst({
        where: {
          token: token,
        },
      });

      if (user) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        req.user = user;
      }
    }

    next();
  }
}
