// import React from "react";


// const formatDate = (dateString) => {

//   if (!dateString) return "—";

//   const date = new Date(dateString);

//   if (isNaN(date)) return "—";


//   return date.toLocaleDateString("en-US", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });

// };



// const RoleBadge = ({ role }) => {

//   const isAdmin =
//     role?.toLowerCase() === "admin";


//   return (

//     <span
//       className={`
//       inline-flex
//       items-center
//       px-3
//       py-1
//       rounded-full
//       text-xs
//       font-semibold
//       border
//       ${
//         isAdmin
//         ?
//         "bg-purple-500/10 text-purple-300 border-purple-500/30"
//         :
//         "bg-blue-500/10 text-blue-300 border-blue-500/30"
//       }
//       `}
//     >

//       {role || "Student"}

//     </span>

//   );

// };





// const UserAvatar = ({name, avatar}) => {


//   if(avatar){

//     return (

//       <img
//         src={avatar}
//         alt={name}
//         className="
//         h-10
//         w-10
//         rounded-full
//         object-cover
//         border
//         border-white/20
//         "
//       />

//     );

//   }


//   const initial =
//     name
//     ?
//     name.charAt(0).toUpperCase()
//     :
//     "?";


//   return (

//     <div
//       className="
//       h-10
//       w-10
//       rounded-full
//       bg-gradient-to-br
//       from-blue-500
//       to-purple-500
//       flex
//       items-center
//       justify-center
//       text-white
//       font-bold
//       "
//     >

//       {initial}

//     </div>

//   );

// };





// const UsersTable = ({users}) => {


//   if(!users || users.length===0){

//     return (

//       <div
//         className="
//         py-16
//         text-center
//         text-slate-400
//         "
//       >

//         No users found.

//       </div>

//     );

//   }




//   return (

//     <div>


//       {/* Desktop Table */}

//       <div
//         className="
//         hidden
//         md:block
//         overflow-x-auto
//         "
//       >


//         <table
//           className="
//           w-full
//           text-left
//           "
//         >


//           <thead>

//             <tr
//               className="
//               border-b
//               border-white/10
//               text-slate-400
//               text-sm
//               "
//             >

//               <th className="px-6 py-4">
//                 Profile
//               </th>

//               <th className="px-6 py-4">
//                 Email
//               </th>

//               <th className="px-6 py-4">
//                 College
//               </th>

//               <th className="px-6 py-4">
//                 Branch
//               </th>

//               <th className="px-6 py-4">
//                 Year
//               </th>

//               <th className="px-6 py-4">
//                 Role
//               </th>

//               <th className="px-6 py-4">
//                 Joined
//               </th>


//             </tr>

//           </thead>




//           <tbody>


//           {
//             users.map((user)=>(


//               <tr
//                 key={user._id}
//                 className="
//                 border-b
//                 border-white/5
//                 hover:bg-white/5
//                 transition
//                 "
//               >


//                 <td className="px-6 py-4">

//                   <div className="flex items-center gap-3">


//                     <UserAvatar
//                       name={user.name}
//                       avatar={user.avatar}
//                     />


//                     <p className="text-white font-medium">

//                       {user.name || "Unnamed User"}

//                     </p>


//                   </div>


//                 </td>



//                 <td className="px-6 py-4 text-slate-300">

//                   {user.email || "—"}

//                 </td>



//                 <td className="px-6 py-4 text-slate-300">

//                   {user.college || "—"}

//                 </td>



//                 <td className="px-6 py-4 text-slate-300">

//                   {user.branch || "—"}

//                 </td>



//                 <td className="px-6 py-4 text-slate-300">

//                   {user.year || "—"}

//                 </td>



//                 <td className="px-6 py-4">

//                   <RoleBadge role={user.role}/>

//                 </td>



//                 <td className="px-6 py-4 text-slate-300">

//                   {formatDate(user.createdAt)}

//                 </td>



//               </tr>


//             ))
//           }


//           </tbody>


//         </table>


//       </div>






//       {/* Mobile Cards */}

//       <div className="md:hidden space-y-4">


//       {
//         users.map((user)=>(


//           <div
//             key={user._id}
//             className="
//             rounded-2xl
//             border
//             border-white/10
//             bg-white/5
//             p-4
//             "
//           >


//             <div className="flex items-center gap-3 mb-4">


//               <UserAvatar
//                 name={user.name}
//                 avatar={user.avatar}
//               />


//               <div>

//                 <p className="text-white font-medium">
//                   {user.name}
//                 </p>

//                 <p className="text-xs text-slate-400">
//                   {user.email}
//                 </p>

//               </div>


//               <div className="ml-auto">

//                 <RoleBadge role={user.role}/>

//               </div>


//             </div>



//             <div className="grid grid-cols-2 gap-3 text-sm">


//               <div>
//                 <p className="text-xs text-slate-500">
//                   College
//                 </p>

//                 <p className="text-slate-300">
//                   {user.college || "—"}
//                 </p>

//               </div>


//               <div>

//                 <p className="text-xs text-slate-500">
//                   Year
//                 </p>

//                 <p className="text-slate-300">
//                   {user.year || "—"}
//                 </p>

//               </div>


//               <div>

//                 <p className="text-xs text-slate-500">
//                   Branch
//                 </p>

//                 <p className="text-slate-300">
//                   {user.branch || "—"}
//                 </p>

//               </div>


//               <div>

//                 <p className="text-xs text-slate-500">
//                   Joined
//                 </p>

//                 <p className="text-slate-300">
//                   {formatDate(user.createdAt)}
//                 </p>

//               </div>


//             </div>


//           </div>


//         ))
//       }


//       </div>


//     </div>

//   );

// };


// export default UsersTable;







import { FiSlash, FiCheckCircle, FiTrash2, FiEye } from "react-icons/fi";

const formatDate = (dateString) => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  if (isNaN(date)) return "—";
  return date.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });
};

const RoleBadge = ({ role }) => {
  const styles = {
    admin: "bg-purple-500/10 text-purple-300 border-purple-500/30",
    moderator: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
    student: "bg-blue-500/10 text-blue-300 border-blue-500/30",
  };
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${styles[role] || styles.student}`}>
      {role || "student"}
    </span>
  );
};

const StatusBadge = ({ isBlocked }) => (
  <span
    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${
      isBlocked
        ? "bg-red-500/10 text-red-300 border-red-500/30"
        : "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
    }`}
  >
    {isBlocked ? "Blocked" : "Active"}
  </span>
);

const UserAvatar = ({ name, avatar }) => {
  if (avatar) {
    return <img src={avatar} alt={name} className="h-10 w-10 rounded-full object-cover border border-white/10 shrink-0" />;
  }
  const initial = name ? name.charAt(0).toUpperCase() : "?";
  return (
    <div className="h-10 w-10 rounded-full shrink-0 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold border border-white/10">
      {initial}
    </div>
  );
};

const UserTable = ({ users, onBlock, onUnblock, onDelete, onViewActivity }) => {
  if (!users || users.length === 0) {
    return <div className="py-16 text-center text-slate-400">No users found.</div>;
  }

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b border-white/10 bg-white/5">
            {["User", "Email", "Role", "Status", "Joined", "Actions"].map((col) => (
              <th key={col} className="px-5 py-4 font-medium text-slate-400 uppercase tracking-wide text-xs whitespace-nowrap">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-colors duration-200">
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <UserAvatar name={user.name} avatar={user.avatar} />
                  <span className="text-white font-medium whitespace-nowrap">{user.name || "Unnamed User"}</span>
                </div>
              </td>
              <td className="px-5 py-4 text-slate-300 whitespace-nowrap">{user.email || "—"}</td>
              <td className="px-5 py-4 whitespace-nowrap"><RoleBadge role={user.role} /></td>
              <td className="px-5 py-4 whitespace-nowrap"><StatusBadge isBlocked={user.isBlocked} /></td>
              <td className="px-5 py-4 text-slate-400 whitespace-nowrap">{formatDate(user.createdAt)}</td>
              <td className="px-5 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onViewActivity?.(user)}
                    title="View activity"
                    className="flex items-center justify-center h-8 w-8 rounded-lg text-blue-300 bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-colors duration-200"
                  >
                    <FiEye className="text-sm" />
                  </button>
                  {user.isBlocked ? (
                    <button
                      onClick={() => onUnblock?.(user)}
                      title="Unblock user"
                      className="flex items-center justify-center h-8 w-8 rounded-lg text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors duration-200"
                    >
                      <FiCheckCircle className="text-sm" />
                    </button>
                  ) : (
                    <button
                      onClick={() => onBlock?.(user)}
                      title="Block user"
                      className="flex items-center justify-center h-8 w-8 rounded-lg text-amber-300 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 transition-colors duration-200"
                    >
                      <FiSlash className="text-sm" />
                    </button>
                  )}
                  <button
                    onClick={() => onDelete?.(user)}
                    title="Delete user"
                    className="flex items-center justify-center h-8 w-8 rounded-lg text-red-300 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-colors duration-200"
                  >
                    <FiTrash2 className="text-sm" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;