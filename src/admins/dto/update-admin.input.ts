import { CreateAdminInput } from './create-admin.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAdminInput extends PartialType(CreateAdminInput) {
  @Field(() => Int)
  id: number;
}
