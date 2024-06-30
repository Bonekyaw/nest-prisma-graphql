import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Admin } from './admin.model';

@ObjectType()
export class Offset {
  @Field(() => Int)
  total: number;

  @Field(() => [Admin], { nullable: true })
  list?: Admin[];

  @Field(() => Int, { nullable: true })
  currentPage?: number;

  @Field(() => Int, { nullable: true })
  previousPage?: number;

  @Field(() => Int, { nullable: true })
  nextPage?: number;

  @Field(() => Int, { nullable: true })
  lastPage?: number;

  @Field(() => Int, { nullable: true })
  countPerPage?: number;
}
