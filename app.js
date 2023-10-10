const express = require('express')
const app = express()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const cors = require('cors')

app.use(cors())

app.get('/', async function (req, res) {
    const getCategory = await prisma.product.findMany({
        where: { categoryId: 5 }
    })

    const allProducts = await prisma.product.findMany({
        where: { name: "Alice" }
    })

    res.json({
        data: getCategory,
    })
})

app.listen(3000)