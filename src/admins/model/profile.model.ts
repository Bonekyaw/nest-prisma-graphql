import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Profile {
  @Field()
  message: string;

  @Field({
    description: 'Should use aws S3 or Cloudinary instead of using like this',
  })
  profile: string;
}
