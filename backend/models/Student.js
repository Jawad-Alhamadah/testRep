import mongoose from "mongoose"

let StudentSchema = new mongoose.Schema({

})
let Student = mongoose.model("student",StudentSchema)
export default Student

//{ref:"User",type:mongoose.SchemaTypes.ObjectId}