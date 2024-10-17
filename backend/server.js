import express from "express"
import mongoose from "mongoose"
import dotenv from 'dotenv'
import router from "./router/router.js"
import cors from "cors"

import path from "path";
import { fileURLToPath } from "url";

let port = 3000 

dotenv.config()

startConnection().catch(err => console.log(err))
async function startConnection() {
    await mongoose.connect(process.env.CONNECTION_STRING)

    console.log("connected to Mongoose")
}

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json())
app.use(router)
app.use(cors())

// app.use(router)


app.listen(port || 7000, () => console.log(`listening to ${port || 7000}`))



