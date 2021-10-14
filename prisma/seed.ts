import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  for (let i = 1; i <= 5; i++) {
    await prisma.author.upsert({
      where: { id: i },
      update: {},
      create: {
        id: i,
        name: `Author${i}`,
        posts: {
          create: (() => {
            const posts = []
            for (let j = 0; j < 10; j++) {
              posts.push({
                content: 'test content',
                title: 'test title',
              })
            }
            return posts
          })(),
        },
      },
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
