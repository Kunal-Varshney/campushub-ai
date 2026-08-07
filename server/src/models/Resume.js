import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
{
 user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
 },

 fullName:String,
 email:String,
 phone:String,

 linkedin:String,
 github:String,
 portfolio:String,

 education:String,
 skills:String,
 projects:String,
 experience:String,
 achievements:String,
 objective:String,

 atsScore:{
    type:Number,
    default:0
 }

},
{
 timestamps:true
}
);


export default mongoose.model("Resume",resumeSchema);