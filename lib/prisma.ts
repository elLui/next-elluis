// Importing the PrismaClient from @prisma/client
import {PrismaClient} from '@prisma/client';

// The global object in NodeJS doesn't have prisma by default. So we create a new type GlobalWithPrisma, which is like
// the global object, but with an optional PrismaClient.
type GlobalWithPrisma = typeof global & { prisma?: PrismaClient };

// We typecast global to our new type. So now, the TypeScript compiler knows that global may have prisma.
const globalPrisma: GlobalWithPrisma = global;

// We then initialize our Prisma Client. If the global object has a prisma client already (i.e., globalPrisma.prisma is not undefined),
// we use that. Otherwise, we create a new instance.
// This helps to prevent multiple instances of Prisma Client in development, which could lead to too many connections to the database.
export const prisma: PrismaClient = globalPrisma.prisma || new PrismaClient();

// If we are not in production mode, we assign our prisma instance to the global object.
// This ensures that if this module is imported elsewhere in our development environment,
// it uses the already created Prisma Client instance rather than creating a new one.
if (process.env.NODE_ENV !== "production") {
    globalPrisma.prisma = prisma;
}

// Properly handle closing of the prisma client when the node.js process is terminated
process.on('exit', () => {
    prisma.$disconnect();
});


// We export our prisma instance as the default export. This allows for easy importing in other modules.
export default prisma;


// import {PrismaClient} from '@prisma/client'
//
// const globalForPrisma = global as unknown as {prisma: PrismaClient};
//
// export const prisma = globalForPrisma.prisma || new PrismaClient();
//
// if (process.env.NODE_ENV !== "production") {
//     globalForPrisma.prisma = prisma;
// }
//
// export default prisma;
