import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { GqlThrottlerGuard } from './GqlThrottlerGuard';
import { AuthModule } from './auth/auth.module';
import { AdminsModule } from './admins/admins.module';
import { DatabaseModule } from './database/database.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { MyLoggerModule } from './my-logger/my-logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    AdminsModule,
    DatabaseModule,
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000, // 1 sec
        limit: 3,
      },
      {
        name: 'medium',
        ttl: 10000, // 10 sec
        limit: 20,
      },
      {
        name: 'long',
        ttl: 60000, // 1 min
        limit: 100,
      },
    ]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),

      sortSchema: true,
      playground: true,
      introspection: true,
      context: ({ req, res }) => ({ req, res }),
    }),
    MyLoggerModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
