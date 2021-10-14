import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number

  @Field()
  title: string

  @Field()
  content?: string

  @Field(() => Int)
  authorID: number
}