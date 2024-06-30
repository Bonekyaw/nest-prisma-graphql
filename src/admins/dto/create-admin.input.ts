import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAdminInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
