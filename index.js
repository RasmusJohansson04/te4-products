const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    await prisma.product.create({
        data: {
            name: 'Lerberg',
            price: 10,
            quantity: 1
        },
    })

    await prisma.category.create({
        data: {
            name: 'Chair',
        },
    })

    // const post = await prisma.post.update({
    //     where: { id: 1 },
    //     data: { content: 'Saker pågår' },
    // })
    //console.log(post)

    // const allUsers = await prisma.user.findMany({
    //     include: {
    //         posts: true,
    //         profile: true,
    //     },
    // })
    // const allPosts = await prisma.post.findMany({
    // })
    // console.dir(allUsers, { depth: null })
    // console.dir(allPosts)
}


main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
