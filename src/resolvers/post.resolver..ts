import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { PrismaService } from '../services/prisma.service'
import { Post } from '../entities/post.entity'
import { PaginationArgs } from './common'
import { Author } from '../entities/author.entity'

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => Post)
  post(@Args('id') id: number): Promise<Post> {
    return this.prisma.post.findFirst({
      where: { id },
    })
  }

  @Query(() => [Post])
  posts(@Args() paginationArgs: PaginationArgs): Promise<Post[]> {
    return this.prisma.post.findMany(paginationArgs)
  }

  @ResolveField(() => Author)
  author(@Parent() post: Post) {
    const { authorID } = post
    return this.prisma.author.findFirst({
      where: { id: authorID },
    })
  }
}
