import { User, Mail, GraduationCap } from "lucide-react";

function Profile() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <section className="min-h-screen bg-slate-950 p-6 text-white">

      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-xl">

        <h1 className="text-3xl font-bold">
          My Profile
        </h1>

        <p className="mt-2 text-gray-400">
          Manage your CampusHub AI profile
        </p>


        <div className="mt-8 space-y-6">

          <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-950/50 p-4">
            <User className="text-blue-400" size={22}/>

            <div>
              <p className="text-sm text-gray-400">
                Name
              </p>

              <p className="font-semibold">
                {user?.name || "Student"}
              </p>
            </div>
          </div>


          <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-950/50 p-4">
            <Mail className="text-cyan-400" size={22}/>

            <div>
              <p className="text-sm text-gray-400">
                Email
              </p>

              <p className="font-semibold">
                {user?.email || "Not Available"}
              </p>
            </div>
          </div>


          <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-950/50 p-4">
            <GraduationCap className="text-purple-400" size={22}/>

            <div>
              <p className="text-sm text-gray-400">
                College
              </p>

              <p className="font-semibold">
                {user?.college || "Not Added"}
              </p>
            </div>
          </div>


        </div>

      </div>

    </section>
  );
}

export default Profile;