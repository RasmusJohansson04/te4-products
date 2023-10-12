const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const { faker } = require('@faker-js/faker')

async function main() {


    for (let i = 0; i < 100; i++) {
        try {
            await prisma.product.create({
                data: product2(),
            })
        } catch (e) {
            console.error(e)
        }
    }

    function product2() {
        return {
            name: faker.commerce.productName(),
            price: Number(faker.commerce.price()),
            quantity: 21,
            categories: {
                create: [
                    {
                        category: {
                            connectOrCreate: {
                                create: {
                                    name: faker.commerce.product()
                                },
                                where: {
                                    name: faker.commerce.product()
                                }
                            }
                        }
                    },
                    // {
                    //     category: {
                    //         connectOrCreate: {
                    //             create: {
                    //                 name: 'Björk'
                    //             },
                    //             where: {
                    //                 name: 'Björk'
                    //             }
                    //         }
                    //     }
                    // }
                ]
            }
        }
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