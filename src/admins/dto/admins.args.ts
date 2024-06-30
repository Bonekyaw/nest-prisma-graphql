import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Min, Max, IsOptional } from 'class-validator';

@ArgsType()
export class AdminArgs {
  @Field(() => Int)
  @IsOptional()
  @Min(0)
  cursor = 0;

  @Field(() => Int)
  @IsOptional()
  @Min(1)
  @Max(20)
  limit = 1;
}
