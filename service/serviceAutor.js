import Autor from "../model/modelautor.js"
import crypto from "crypto"

export const getAutores = async ()=>{
    const autores = await Autor.find({isHabilitado:true})
    return autores
}
export const getAutor = async (id)=>{
    const autor = await Autor.find({id:id})
    return autor
}

export const createAutor = async (nombre,biografia,fechaNacimiento,redSocial,fotoPerfil)=>{
    const datosAutor={
        nombre,biografia,fechaNacimiento,redSocial,fotoPerfil, id:crypto.randomUUID()
    }
    const autor = await Autor.create(datosAutor)
    return autor
}
export const updateAutor = async (id,nombre,biografia,fechaNacimiento,redSocial,fotoPerfil)=>{
    const autor = await Autor.findOneAndUpdate({id},{nombre,biografia,fechaNacimiento,redSocial,fotoPerfil})
    return autor
}
export const deleteAutor = async (id)=>{
    //const blogBorrado = await Blog.findOneAndDelete(id) // borrado fisico
    const autor = await Autor.findOneAndUpdate({id:id},{isHabilitado:false}) // borrado logico
    return autor
}