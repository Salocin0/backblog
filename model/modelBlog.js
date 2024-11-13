import mongoose,{Schema}from "mongoose";

const blogSchema = new mongoose.Schema({
    id: {type: String, require:true, unique:true},
    contenido: {type:String, require:true},
    titulo: {type:String, require:true},
    imagen: {type:String, require:true},
    //autor: {type:Schema.Types.ObjectId, ref: "autor"},
    descripcion: {type:String, require:true},
    fechaPublicacion: {type:Date, default: new Date()},
    isHabilitado: {type:Boolean,default:true}
})

const Blog = mongoose.model("blog", blogSchema)

export default Blog