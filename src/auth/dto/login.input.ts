import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

@InputType()
export class LoginInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @Length(8, 12)
  @Matches(/^[0-9]+$/, {
    message: 'Invalid phone number.',
  })
  phone: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @Length(8, 8)
  @Matches(/^[0-9]+$/, {
    message: 'Invalid Password.',
  })
  password: string;
}
