import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([User]), RolesModule],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
