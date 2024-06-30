import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsResolver } from './admins.resolver';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [AdminsResolver, AdminsService],
  exports: [AdminsService],
})
export class AdminsModule {}
