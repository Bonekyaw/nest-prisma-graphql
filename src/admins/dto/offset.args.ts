import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Min, Max, IsOptional } from 'class-validator';

@ArgsType()
export class OffsetArgs {
  @Field(() => Int)
  @IsOptional()
  @Min(1)
  page = 1;

  @Field(() => Int)
  @IsOptional()
  @Min(1)
  @Max(20)
  limit = 1;
}
