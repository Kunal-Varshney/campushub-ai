import Resume from "../models/Resume.js";


export const generateResume = async(req,res)=>{

try{

const resumeData=req.body;


const atsScore =
resumeData.skills && resumeData.projects
? 92
:75;


const resume = await Resume.create({

user:req.user.id,

...resumeData,

atsScore

});


res.status(201).json({

success:true,

message:"Resume Generated",

resume

});


}
catch(error){

res.status(500).json({

success:false,
message:error.message

});

}


};