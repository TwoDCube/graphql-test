import { ArgsType, Field, Int } from '@nestjs/graphql'
import { Max } from 'class-validator'

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { nullable: true })
  skip: number

  @Field(() => Int, { nullable: true })
  @Max(20)
  take: number
}
