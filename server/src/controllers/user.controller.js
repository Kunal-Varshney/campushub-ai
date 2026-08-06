import User from "../models/User.js";


// GET USER PROFILE
export const getProfile = async (req, res) => {

  try {

    const user = await User.findById(req.user.id)
      .select("-password");


    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    }


    res.status(200).json({

      success: true,
      user,

    });


  } catch (error) {

    res.status(500).json({

      success: false,
      message: error.message,

    });

  }

};




// UPDATE USER PROFILE
export const updateProfile = async (req, res) => {

  try {

    const {
      name,
      college,
      branch,
      year,
    } = req.body;



    const user = await User.findByIdAndUpdate(

      req.user.id,

      {
        name,
        college,
        branch,
        year,
      },

      {
        new: true,
        runValidators: true,
      }

    ).select("-password");



    if (!user) {

      return res.status(404).json({

        success: false,
        message: "User not found",

      });

    }



    res.status(200).json({

      success: true,

      message: "Profile Updated Successfully 🚀",

      user,

    });



  } catch (error) {


    res.status(500).json({

      success: false,

      message: error.message,

    });


  }

};