import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GraphQLModule } from '@nestjs/graphql'
import { PrismaService } from './services/prisma.service'
import { AuthorResolver } from './resolvers/author.resolver'
import { PostResolver } from './resolvers/post.resolver.'

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      sortSchema: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, AuthorResolver, PostResolver],
})
export class AppModule {}
