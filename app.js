const express = require('express')
const app = express()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const cors = require('cors')

app.use(cors())

app.get('/', async function (req, res) {
    const allProducts = await prisma.product.findMany({
    })

    res.json({
        data: allProducts,
    })
})

app.listen(3000)