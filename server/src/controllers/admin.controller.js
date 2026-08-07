import User from "../models/User.js";
import Note from "../models/note.js";


// ===============================
// GET ALL USERS
// ===============================

export const getAllUsers = async (req, res) => {

  try {

    const users = await User.find()
      .select("-password")
      .sort({
        createdAt: -1,
      });


    res.status(200).json({

      success: true,
      users,

    });


  } catch (error) {

    res.status(500).json({

      success: false,
      message: "Failed to fetch users",
      error: error.message,

    });

  }

};




// ===============================
// DASHBOARD STATS
// ===============================

export const getDashboardStats = async (req, res) => {

  try {


    const totalUsers = await User.countDocuments();


    const students = await User.countDocuments({
      role: "student",
    });


    const admins = await User.countDocuments({
      role: "admin",
    });


    const totalNotes = await Note.countDocuments();



    res.status(200).json({

      success: true,

      stats: {

        totalUsers,
        students,
        admins,
        totalNotes,

      },

    });



  } catch(error) {


    res.status(500).json({

      success:false,

      message:"Failed to fetch dashboard stats",

      error:error.message,

    });


  }

};




// ===============================
// GET ALL NOTES FOR ADMIN
// ===============================

export const getAllNotes = async(req,res)=>{

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


}
catch(error){


res.status(500).json({

success:false,

message:"Failed to fetch notes",

error:error.message

});


}

};




// ===============================
// DELETE USER
// ===============================

export const deleteUser = async(req,res)=>{

try{


await User.findByIdAndDelete(req.params.id);



res.status(200).json({

success:true,

message:"User deleted successfully"

});


}
catch(error){


res.status(500).json({

success:false,

message:error.message

});


}

};