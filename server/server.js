import express from "express"
import cors from "cors"
import "dotenv/config"
import { clerkMiddleware, requireAuth } from '@clerk/express'
import aiRouter from "./routes/aiRoutes.js"
import connectCloudinary from "./configs/cloudinary.js"
import userRouter from "./routes/userRoutes.js"
const app = express();

await connectCloudinary();

app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    console.log(`[REQ] ${new Date().toISOString()} ${req.method} ${req.path} — AuthHeader: ${!!req.headers.authorization}`);
    next();
  });

app.use(clerkMiddleware())

app.get('/', (req, res) => res.send('Server is running'))

app.use('/api/ai', aiRouter)
app.use('/api/user', userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})