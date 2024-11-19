import mongoose,{Schema}from "mongoose";

const blogSchema = new mongoose.Schema({
    id: {type: String, require:true, unique:true},

})

const Blog = mongoose.model("blog", blogSchema)

export default Blog