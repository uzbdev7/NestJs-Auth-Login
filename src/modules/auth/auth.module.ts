import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { MyLoggger } from 'src/middleware/logger';
import { CheckToken } from 'src/middleware/checkToken';

@Module({
  imports: [
    JwtModule.register({
      secret: 'shaftoli',
      signOptions: { expiresIn: '60s' },
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(MyLoggger).forRoutes({path:"auth", method:RequestMethod.GET})

    consumer.apply(CheckToken).forRoutes({path:"auth/login", method:RequestMethod.POST})

    // consumer.
    // apply(CheckToken)
    //.exclude('auth/register') shundan bosshqa hammasiga ishlasin degani.
    // .forRoutes('*')  hamma  routelar uchun glabal
  }
}
