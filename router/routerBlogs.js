import express from "express"
import { createBlogController,updateBlogController,getBlogController,getBlogPopulateController,getBlogsController,deleteBlogController } from "../controller/controllerBlog.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const routerBlogs = express.Router();

routerBlogs.get("/",getBlogsController)
routerBlogs.get("/:id",getBlogController)
routerBlogs.get("/populate/:id",getBlogPopulateController)
routerBlogs.post("/",authMiddleware,createBlogController)
routerBlogs.put("/:id",updateBlogController)
routerBlogs.delete("/:id",deleteBlogController)

export default routerBlogs