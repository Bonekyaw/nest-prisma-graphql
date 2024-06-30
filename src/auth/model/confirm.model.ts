import { ObjectType, Field, ID } from '@nestjs/graphql';
import { GraphQLJWT } from 'graphql-scalars';

@ObjectType()
export class Confirm {
  @Field()
  message: string;

  @Field(() => GraphQLJWT, { description: 'JWT access token' })
  token: string;

  @Field()
  phone: string;

  @Field(() => ID)
  user_id: number;

  @Field()
  randomToken: string;
}
