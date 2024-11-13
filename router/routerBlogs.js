import express from "express"
import { createBlogController,updateBlogController,getBlogController,getBlogsController,deleteBlogController } from "../controller/controllerBlog.js";

const routerBlogs = express.Router();

routerBlogs.get("/",getBlogsController)
routerBlogs.get("/:id",getBlogController)
routerBlogs.post("/",createBlogController)
routerBlogs.put("/:id",updateBlogController)
routerBlogs.delete("/:id",deleteBlogController)

export default routerBlogs