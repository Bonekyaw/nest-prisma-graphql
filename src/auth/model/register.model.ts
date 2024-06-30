import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Register {
  @Field()
  message: string;

  @Field()
  phone: string;

  @Field()
  token: string;
}
