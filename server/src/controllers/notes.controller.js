import Note from "../models/Note.js";


// CREATE NOTE
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

      success: true,
      message: "Note Uploaded Successfully 🚀",
      note,

    });


  } catch (error) {

    res.status(500).json({

      success: false,
      message: error.message,

    });

  }

};





// GET ALL NOTES
export const getNotes = async (req, res) => {

  try {


    const notes = await Note.find()
      .populate("uploadedBy", "name email")
      .sort({
        createdAt: -1,
      });



    res.status(200).json({

      success: true,
      notes,

    });



  } catch (error) {


    res.status(500).json({

      success: false,
      message: error.message,

    });


  }

};