import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({ secret: "BI_MAT" })],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
