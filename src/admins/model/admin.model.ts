import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Admin {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  name?: string;

  @Field()
  phone: string;

  @Field({ nullable: true })
  role?: string;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  lastLogin?: Date;

  @Field({ nullable: true })
  profile?: string;

  @Field()
  createdAt: Date;
}

// type Admin {
//   id: ID!
//   name: String
//   phone: String!
//   role: String
//   status: String
//   lastLogin: String
//   profile: String
//   createdAt: String!
// }
