import "dotenv/config";
import Note from "../models/note.js";
import Groq from "groq-sdk";

console.log("GROQ_API_KEY =", process.env.GROQ_API_KEY);

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

console.log(
  "Groq Key:",
  process.env.GROQ_API_KEY ? "Loaded ✅" : "Missing ❌"
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



// Groq Prompt

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



// Groq API Call

const completion = await groq.chat.completions.create({
  model: "llama-3.3-70b-versatile",
  messages: [
    {
      role: "user",
      content: prompt,
    },
  ],
  temperature: 0.4,
});


let text = completion.choices[0].message.content;

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


console.log("GROQ ERROR:",error);


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