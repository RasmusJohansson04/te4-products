const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    for (let i = 0; i < 100; i++) {
        const product2 = await prisma.product.create({
            data: {
                name: `Ivar ${i + 1}`,
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
                        },
                        {
                            category: {
                                connectOrCreate: {
                                    create: {
                                        name: 'Björk'
                                    },
                                    where: {
                                        name: 'Björk'
                                    }
                                }
                            }
                        }
                    ]
                },
            }
        })
    }
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