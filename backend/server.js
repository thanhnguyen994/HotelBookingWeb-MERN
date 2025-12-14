import express from "express"
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/coudinary.js";


const app = express();

const port = process.env.PORT || 4000

connectDB()
connectCloudinary()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send("API Working")
})

app.listen(port, () => console.log('Server start on Port: ' + port))