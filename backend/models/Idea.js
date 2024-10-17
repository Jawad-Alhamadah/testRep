import mongoose from "mongoose"

let IdeaSchema = new mongoose.Schema(
    {

        studentId: { ref: "Account", type: mongoose.SchemaTypes.ObjectId },
        studentName: String,
        title: String,
        description: String,
        status: String,
        comment: String,
        date: Date,

    },

)
let Idea = mongoose.model("idea", IdeaSchema)
export default Idea
//{ref:"User",type:mongoose.SchemaTypes.ObjectId}