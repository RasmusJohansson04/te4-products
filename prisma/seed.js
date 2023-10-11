const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    const product = await prisma.product.create({
        data: {
            name: 'Holger',
            price: 200,
            quantity: 3,
            categories: {
                create: [
                    {
                        category: {
                            connectOrCreate: {
                                create: {
                                    name: 'Chair'
                                },
                                where: {
                                    name: 'Chair'
                                }
                            }
                        }
                    }
                ]
            },
        }
    })

    const product2 = await prisma.product.create({
        data: {
            name: 'Ivar',
            price: 350,
            quantity: 4,
            categories: {
                create: [
                    {
                        category: {
                            connectOrCreate: {
                                create: {
                                    name: 'Table'
                                },
                                where: {
                                    name: 'Table'
                                }
                            }
                        }
                    }
                ]
            },
        }
    })
    console.log(product)
    console.log(product2)
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