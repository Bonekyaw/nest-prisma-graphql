import { ObjectType, Field } from '@nestjs/graphql';
import { Admin } from './admin.model';

@ObjectType()
export class Cursor {
  @Field({ nullable: true })
  nextCursor?: string;

  @Field(() => [Admin], { nullable: true })
  list?: Admin[];
}
