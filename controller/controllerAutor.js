import { getAutor, getAutores, createAutor, updateAutor, deleteAutor } from "../service/serviceAutor.js"
export const getAutoresController = async (req, res)=>{
    try {
        const autores = await getAutores()
        if(autores){
            return res.status(200).json({status:"success", message:"blogs encontrados", data:autores})
        }else{
            return res.status(400).json({status:"error", message:"blogs no encontrados", data:{}})
        }
    } catch (error) {
        return res.status(500).json({status:"error", message:"error en el servidor", data:{}})
    }
}

export const getAutorController = async (req, res)=>{
    try {
        const id = req.params.id
        const autor = await getAutor(id)
        if(autor){
            return res.status(200).json({status:"success", message:"blog encontrado", data:autor})
        }else{
            return res.status(400).json({status:"error", message:"blog no encontrados", data:{}})
        }
    } catch (error) {
        return res.status(500).json({status:"error", message:"error en el servidor", data:{}})
    }
}

export const createAutorController = async (req, res)=>{
    try {
        const {nombre,biografia,fechaNacimiento,redSocial,fotoPerfil} = req.body
        if(!nombre || !biografia || !fechaNacimiento || !redSocial || !fotoPerfil){
            return res.status(401).json({status:"error", message:"faltan datos", data:{}})
        }
        const autor = await createAutor(nombre,biografia,fechaNacimiento,redSocial,fotoPerfil)
        if(autor){
            return res.status(201).json({status:"success", message:"blog creado", data:autor})
        }else{
            return res.status(400).json({status:"error", message:"no se creo el blog con exito", data:{}})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({status:"error", message:"error en el servidor", data:{}})
    }
}

export const updateAutorController = async (req, res)=>{
    try {
        const id = req.params.id
        const {nombre,biografia,fechaNacimiento,redSocial,fotoPerfil} = req.body
        if(!nombre || !biografia || !fechaNacimiento || !redSocial || !fotoPerfil){
            return res.status(400).json({status:"error", message:"faltan datos", data:{}})
        }
        const autor = await updateAutor(id,nombre,biografia,fechaNacimiento,redSocial,fotoPerfil) 
        if(autor){
            return res.status(201).json({status:"success", message:"blog actualizado", data:autor})
        }else{
            return res.status(400).json({status:"error", message:"no se actualizo el blog con exito", data:{}})
        }
    } catch (error) {
        return res.status(500).json({status:"error", message:"error en el servidor", data:{}})
    }
}

export const deleteAutorController = async (req, res)=>{
    try {
        const id = req.params.id
        const autor = await deleteAutor(id)
        if(autor){
            return res.status(201).json({status:"success", message:"blog borrado", data:autor})
        }else{
            return res.status(400).json({status:"error", message:"no se borro el blog con exito", data:{}})
        }
    } catch (error) {
        return res.status(500).json({status:"error", message:"error en el servidor", data:{}})
    }
}