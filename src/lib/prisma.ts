import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  // Pass an empty config object as requested by Next.js edge/Vercel rules or new Prisma version
  return new PrismaClient({})
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
