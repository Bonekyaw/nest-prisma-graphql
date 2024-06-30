import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

@InputType()
export class RegisterInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @Length(8, 12)
  @Matches(/^[0-9]+$/, {
    message: 'Invalid phone number.',
  })
  phone: string;
}
