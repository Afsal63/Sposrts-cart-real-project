import express from 'express'
import dotenv from 'dotenv'
import colors from "colors"
import connctDB from './config/db.js'
import { errorHandler, notFound } from './middleware/errorMidleware.js'
import productRouts from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
dotenv.config()
connctDB()
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is running...')
})
app.use('/api/products', productRouts)
app.use('/api/users', userRoutes )
app.use('/api/orders',orderRoutes)

app.get('/api/config/paypal',(req,res)=>res.send(process.env.PAYPAL_CLIENT_ID))

app.use(notFound)
app.use(errorHandler)




const PORT = process.env.PORT || 6001
app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))