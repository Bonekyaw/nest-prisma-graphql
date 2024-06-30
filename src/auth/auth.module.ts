import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { DatabaseModule } from '../database/database.module';
import { AdminsModule } from '../admins/admins.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    AdminsModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('TOKEN_SECRET'),
        signOptions: { expiresIn: '7d' }, // e.g. 30s, 5m, 7d, 24h
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthResolver, AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
