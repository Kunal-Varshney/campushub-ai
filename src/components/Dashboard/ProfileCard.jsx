import { useState } from "react";
import { Pencil, X } from "lucide-react";
import { motion } from "framer-motion";
import API from "../../services/api";


function ProfileCard({ user }) {

  const completion = 82;

  const [isOpen, setIsOpen] = useState(false);


  const [formData, setFormData] = useState({
    name: user?.name || "",
    college: user?.college || "",
    branch: user?.branch || "",
    year: user?.year || "",
  });



  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };



  const handleUpdate = async () => {

    try {

      console.log("SENDING DATA:", formData);


      const response = await API.put(
        "/user/profile",
        {
          name: formData.name,
          college: formData.college,
          branch: formData.branch,
          year: Number(formData.year),
        }
      );


      console.log(
        "UPDATE RESPONSE:",
        response.data
      );


      alert("Profile Updated Successfully 🚀");


      setIsOpen(false);


      window.location.reload();



    } catch (error) {


      console.log(
        "UPDATE ERROR:",
        error.response?.data || error.message
      );


      alert(
        error.response?.data?.message || "Profile Update Failed"
      );


    }

  };
     



  return (

    <>


      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl"
      >


        <div className="flex items-center gap-4">


          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-blue-400/20 bg-gradient-to-r from-blue-600 to-cyan-500 text-lg font-semibold">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>



          <div>

            <h3 className="font-semibold">
              {user?.name || "Loading..."}
            </h3>


            <p className="text-sm text-gray-400">
              {user?.branch || "Computer Science"}
            </p>


          </div>


        </div>




        <dl className="mt-5 space-y-2 text-sm">


          <div className="flex justify-between text-gray-400">
            <dt>College</dt>
            <dd className="text-gray-200">
              {user?.college || "Not Added"}
            </dd>
          </div>



          <div className="flex justify-between text-gray-400">
            <dt>Year</dt>
            <dd className="text-gray-200">
              {user?.year ? `${user.year} Year` : "Not Added"}
            </dd>
          </div>



          <div className="flex justify-between text-gray-400">
            <dt>Email</dt>
            <dd className="truncate text-gray-200">
              {user?.email}
            </dd>
          </div>



          <div className="flex justify-between text-gray-400">
            <dt>Role</dt>

            <dd className="capitalize text-gray-200">
              {user?.role}
            </dd>

          </div>


        </dl>




        <div className="mt-5">

          <div className="mb-1 flex justify-between text-xs text-gray-400">

            <span>
              Profile Completion
            </span>

            <span>
              {completion}%
            </span>

          </div>



          <div className="h-2 rounded-full bg-slate-800">

            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
              style={{
                width:`${completion}%`
              }}
            />

          </div>


        </div>





        <button
          onClick={() => setIsOpen(true)}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/70 py-2.5 text-sm font-semibold hover:border-blue-500 hover:text-blue-400"
        >

          <Pencil size={14}/>

          Edit Profile

        </button>



      </motion.div>






      {isOpen && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">


          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6">


            <div className="mb-5 flex justify-between">

              <h2 className="text-xl font-bold">
                Edit Profile
              </h2>


              <button onClick={()=>setIsOpen(false)}>
                <X />
              </button>


            </div>




            <div className="space-y-4">


              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full rounded-xl bg-slate-950 border border-slate-700 p-3"
              />



              <input
                name="college"
                value={formData.college}
                onChange={handleChange}
                placeholder="College"
                className="w-full rounded-xl bg-slate-950 border border-slate-700 p-3"
              />



              <input
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                placeholder="Branch"
                className="w-full rounded-xl bg-slate-950 border border-slate-700 p-3"
              />



              <input
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="Year"
                className="w-full rounded-xl bg-slate-950 border border-slate-700 p-3"
              />




              <button
                onClick={handleUpdate}
                className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3 font-semibold"
              >

                Save Changes

              </button>



            </div>



          </div>


        </div>

      )}


    </>
  );

}


export default ProfileCard;