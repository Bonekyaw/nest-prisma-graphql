import { ObjectType, Field, ID } from '@nestjs/graphql';
import { GraphQLJWT } from 'graphql-scalars';

@ObjectType()
export class Login {
  @Field()
  message: string;

  @Field(() => GraphQLJWT, { description: 'JWT access token' })
  token: string;

  @Field(() => ID)
  user_id: number;

  @Field({ description: 'Refresh token' })
  randomToken: string;
}
