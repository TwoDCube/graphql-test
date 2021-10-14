import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { Author } from '../entities/author.entity'
import { PrismaService } from '../services/prisma.service'
import { PaginationArgs } from './common'
import { Post } from '../entities/post.entity'

@Resolver(() => Author)
export class AuthorResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => Author)
  author(@Args('id', { type: () => Int }) id: number): Promise<Author> {
    return this.prisma.author.findFirst({
      where: { id },
    })
  }

  @Query(() => [Author])
  authors(@Args() paginationArgs: PaginationArgs): Promise<Author[]> {
    return this.prisma.author.findMany(paginationArgs)
  }

  @ResolveField(() => [Post])
  posts(@Parent() author: Author, @Args() paginationArgs: PaginationArgs) {
    const { id } = author
    return this.prisma.post.findMany({
      where: { authorID: id },
      ...paginationArgs,
    })
  }
}
