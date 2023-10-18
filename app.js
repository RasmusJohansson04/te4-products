const express = require('express')
const app = express()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const cors = require('cors')

app.use(cors())

app.get('/product', async function (req, res) {
    const { page = 1, perPage = 10 } = req.query

    try {
        const allProducts = await prisma.product.findMany({
            skip: (Number(page) - 1) * Number(perPage),
            take: Number(perPage),
            include: {
                categories: true,
            }
        })
        res.json({
            data: allProducts,
        })
    } catch (error) {
        res.send('Error')
    }
})

app.get('/product/:id', async function (req, res) {
    const productId = req.params.id
    try {
        const product = await prisma.product.findUnique({
            where: { id: Number(productId) }
        })
        if (product.data !== null) {
            res.json({
                data: product
            })
        }
    } catch (error) {
        console.error(error)
        res.send('Error')
    }
})

app.get('/product/category/:id', async function (req, res) {
    const categoryId = req.params.id
    try {
        const products = await prisma.product.findMany({
            include: {
                categories: true
            },
            where: {
                categories: {
                    some: {
                        categoryId: Number(categoryId)
                    }
                }
            }
        })
        res.json({
            data: products
        })
    } catch (error) {
        console.error(error)
        res.send(error)
    }
})

app.listen(3000)