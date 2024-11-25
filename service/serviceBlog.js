import Blog from "../model/modelBlog.js"
import crypto from "crypto"

export const getBlogs = async ()=>{
    const blogs = await Blog.find({isHabilitado:true})
    return blogs
}
export const getBlog = async (id)=>{
    const blog = await Blog.find({id:id})
    return blog
}

export const getBlogPopulate = async (id)=>{
    const blog = await Blog.find({id:id}).populate("autor")
    return blog
}

export const createBlog = async (contenido,titulo,imagen,autor,descripcion)=>{
    const datosBlog={
        contenido:contenido,titulo,imagen,descripcion,autor, id:crypto.randomUUID()
    }
    const nuevoBlog = await Blog.create(datosBlog)
    return nuevoBlog
}
export const updateBlog = async (id,contenido,titulo,imagen,autor,descripcion)=>{
    const blogActualizado = await Blog.findOneAndUpdate({id},{contenido,titulo,imagen,autor,descripcion})
    return blogActualizado
}
export const deleteBlog = async (id)=>{
    //const blogBorrado = await Blog.findOneAndDelete(id) // borrado fisico
    const blogBorrado = await Blog.findOneAndUpdate({id:id},{isHabilitado:false}) // borrado logico
    return blogBorrado
}