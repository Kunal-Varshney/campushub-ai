import Note from "../models/note.js";
import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);


const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

console.log(
  "Gemini Key:",
  process.env.GEMINI_API_KEY ? "Loaded ✅" : "Missing ❌"
);



// =======================
// CREATE NOTE
// =======================
export const createNote = async (req, res) => {
  try {

    const {
      title,
      description,
      subject,
      branch,
      year,
      fileUrl,
    } = req.body;


    const note = await Note.create({

      title,
      description,
      subject,
      branch,
      year,
      fileUrl,
      uploadedBy: req.user.id,

    });


    res.status(201).json({

      success:true,
      message:"Note Uploaded Successfully 🚀",
      note,

    });


  } catch(error){

    res.status(500).json({

      success:false,
      message:error.message,

    });

  }
};




// =======================
// AI SMART NOTE GENERATOR
// =======================
export const generateNote = async(req,res)=>{

try{


const {
  description,
  subject
}=req.body;



if(!description){

return res.status(400).json({

success:false,
message:"Description required"

});

}



// Gemini Prompt

const prompt = `

You are CampusHub AI study assistant.

Create detailed exam focused notes.

Subject:
${subject}


Topic Content:
${description}


Return ONLY valid JSON.

Format:

{
"title":"Topic name",
"summary":"Short explanation",
"points":[
"point 1",
"point 2",
"point 3"
],
"keywords":[
"keyword1",
"keyword2"
],
"examTips":[
"tip1",
"tip2"
]
}

`;



// Gemini API Call

const result = await model.generateContent(prompt);


let text = result.response.text();

// Remove markdown if Gemini adds it

text = text
.replace(/```json/g,"")
.replace(/```/g,"")
.trim();



const aiNotes = JSON.parse(text);




// Save Notes

const note = await Note.create({

title:
aiNotes.title || `${subject} Notes`,


description,


subject,


summary:
aiNotes.summary || "",


points:
aiNotes.points || [],


keywords:
aiNotes.keywords || [],


examTips:
aiNotes.examTips || [],


branch:"AI & ML",


year:2,


fileUrl:"",


uploadedBy:req.user.id,


});





res.status(201).json({

success:true,

message:"AI Notes Generated Successfully 🚀",

note

});



}
catch(error){


console.log("GEMINI ERROR:",error);


res.status(500).json({

success:false,

message:error.message

});


}

};




// =======================
// GET ALL NOTES
// =======================

export const getNotes = async(req,res)=>{

try{


const notes = await Note.find()

.populate(
"uploadedBy",
"name email"
)

.sort({

createdAt:-1

});



res.status(200).json({

success:true,

notes

});



}catch(error){


res.status(500).json({

success:false,

message:error.message

});


}

};