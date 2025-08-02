import express from "express"
import { auth } from "../middleware/auth.js";
import { generateArticle, generateBlogTitle, generateImage } from "../contoller/aiController.js";

const aiRouter = express.Router();

aiRouter.post('/generate-article', auth, generateArticle)
aiRouter.post('/generate-blogTitle', auth, generateBlogTitle)
aiRouter.post('/generate-image', auth, generateImage)

export default aiRouter;