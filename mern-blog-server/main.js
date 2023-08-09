import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from "cors"
import authRoute from "./routes/auth.js"
import postRoute from "./routes/posts.js"
import commentRoute from "./routes/comment.js"
import fileUpload from "express-fileupload"
const app = express();

// ENV
dotenv.config();
const {PORT, DB_USER, DB_PASSWORD, DB_NAME} = process.env

// CORS
app.use(cors())
app.use(fileUpload({}))
app.use(express.json())
app.use(express.static('uploads'))


// Routes
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)
app.use("/api/comments", commentRoute)


async function start() {
 try {
     await mongoose.connect(`mongodb://localhost:27017`)
     app.listen(PORT, () => console.log("Started on ", PORT ))

 } catch (e) {
     console.log(e)
 }
}
start()
