import { getBlogs, getBlog, createBlog, updateBlog, deleteBlog,getBlogPopulate } from "../service/serviceBlog.js"
export const getBlogsController = async (req, res)=>{
    try {
        const blogs = await getBlogs()
        if(blogs){
            return res.status(200).json({status:"success", message:"blogs encontrados", data:blogs})
        }else{
            return res.status(400).json({status:"error", message:"blogs no encontrados", data:{}})
        }
    } catch (error) {
        return res.status(500).json({status:"error", message:"error en el servidor", data:{}})
    }
}

export const getBlogController = async (req, res)=>{
    try {
        const id = req.params.id
        const blog = await getBlog(id)
        if(blog){
            return res.status(200).json({status:"success", message:"blog encontrado", data:blog})
        }else{
            return res.status(400).json({status:"error", message:"blog no encontrados", data:{}})
        }
    } catch (error) {
        return res.status(500).json({status:"error", message:"error en el servidor", data:{}})
    }
}

export const getBlogPopulateController = async (req, res)=>{
    try {
        const id = req.params.id
        const blog = await getBlogPopulate(id)
        if(blog){
            return res.status(200).json({status:"success", message:"blog encontrado", data:blog})
        }else{
            return res.status(400).json({status:"error", message:"blog no encontrados", data:{}})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({status:"error", message:"error en el servidor", data:{}})
    }
}

export const createBlogController = async (req, res)=>{
    try {
        const {contenido,titulo,imagen,autor,descripcion} = req.body
        console.log(req.body)
        if(!contenido || !titulo || !imagen || !descripcion){
            return res.status(401).json({status:"error", message:"faltan datos", data:{}})
        }
        const nuevoBlog = await createBlog(contenido,titulo,imagen,autor,descripcion)
        if(nuevoBlog){
            return res.status(201).json({status:"success", message:"blog creado", data:nuevoBlog})
        }else{
            return res.status(400).json({status:"error", message:"no se creo el blog con exito", data:{}})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({status:"error", message:"error en el servidor", data:{}})
    }
}

export const updateBlogController = async (req, res)=>{
    try {
        const id = req.params.id
        const {contenido,titulo,imagen,autor,descripcion} = req.body
        if(!contenido || !titulo || !imagen || !autor || !descripcion){
            return res.status(400).json({status:"error", message:"faltan datos", data:{}})
        }
        const blogActualizado = await updateBlog(id,contenido,titulo,imagen,autor,descripcion) 
        if(blogActualizado){
            return res.status(201).json({status:"success", message:"blog actualizado", data:blogActualizado})
        }else{
            return res.status(400).json({status:"error", message:"no se actualizo el blog con exito", data:{}})
        }
    } catch (error) {
        return res.status(500).json({status:"error", message:"error en el servidor", data:{}})
    }
}

export const deleteBlogController = async (req, res)=>{
    try {
        const id = req.params.id
        const blogBorrado = await deleteBlog(id)
        if(blogBorrado){
            return res.status(201).json({status:"success", message:"blog borrado", data:blogBorrado})
        }else{
            return res.status(400).json({status:"error", message:"no se borro el blog con exito", data:{}})
        }
    } catch (error) {
        return res.status(500).json({status:"error", message:"error en el servidor", data:{}})
    }
}