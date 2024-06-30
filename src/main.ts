import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js'; // Should use aws S3 or Cloudinary instead of using like this

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)));
  app.useGlobalGuards(new RolesGuard(app.get(Reflector)));
  app.use(graphqlUploadExpress({ maxFileSize: 5000000, maxFiles: 5 })); // 5 MB
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors();
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`GraphQL Playground: ${await app.getUrl()}/graphql`);
}
bootstrap();
