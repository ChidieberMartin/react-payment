import express from'express'
const app = express()
import cors from'cors'
import dotenv from'dotenv'
dotenv.config()

import paymentRoutes from'./routes/paymentRoutes.js'


app.use(cors())
app.use(express.json())

app.use("/api/pay", paymentRoutes);

const port =  process.env.PORT || 4000

app.listen(port, () => {
    console.log(`Server is running on port http://localhost${port}`)
})

