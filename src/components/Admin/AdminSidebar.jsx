// import {
//   FiGrid,
//   FiUsers,
//   FiFileText,
//   FiBarChart2,
//   FiSettings,
//   FiLogOut,
//   FiZap,
// } from "react-icons/fi";


// const navItems = [
//   {
//     id: "dashboard",
//     label: "Dashboard",
//     icon: FiGrid,
//   },
//   {
//     id: "users",
//     label: "Users",
//     icon: FiUsers,
//   },
//   {
//     id: "notes",
//     label: "Notes",
//     icon: FiFileText,
//   },
//   {
//     id: "analytics",
//     label: "Analytics",
//     icon: FiBarChart2,
//   },
//   {
//     id: "settings",
//     label: "Settings",
//     icon: FiSettings,
//   },
// ];


// const AdminSidebar = ({
//   active,
//   setActive,
// }) => {


//   return (

//     <aside
//       className="
//       fixed
//       left-0
//       top-0
//       h-screen
//       w-64
//       bg-slate-950/90
//       backdrop-blur-xl
//       border-r
//       border-white/10
//       flex
//       flex-col
//       z-50
//       "
//     >


//       {/* Logo */}

//       <div
//         className="
//         px-6
//         py-6
//         border-b
//         border-white/10
//         "
//       >

//         <div className="flex items-center gap-3">

//           <div
//             className="
//             h-11
//             w-11
//             rounded-xl
//             bg-gradient-to-br
//             from-blue-500
//             to-purple-500
//             flex
//             items-center
//             justify-center
//             text-white
//             shadow-lg
//             "
//           >

//             <FiZap size={22}/>

//           </div>


//           <div>

//             <h1 className="text-white font-bold text-lg">
//               CampusHub AI
//             </h1>

//             <p className="text-xs text-slate-400">
//               Admin Panel
//             </p>

//           </div>

//         </div>

//       </div>




//       {/* Navigation */}

//       <nav
//         className="
//         flex-1
//         px-4
//         py-6
//         space-y-2
//         "
//       >

//         {
//           navItems.map((item)=>{

//             const Icon = item.icon;

//             const activeBtn =
//               active === item.id;


//             return (

//               <button

//                 key={item.id}

//                 onClick={() =>
//                   setActive(item.id)
//                 }

//                 className={`
//                 w-full
//                 flex
//                 items-center
//                 gap-3
//                 px-4
//                 py-3
//                 rounded-xl
//                 transition-all
//                 duration-300
//                 ${
//                   activeBtn
//                   ?
//                   `
//                   bg-gradient-to-r
//                   from-blue-500/20
//                   to-purple-500/20
//                   text-white
//                   border
//                   border-blue-400/30
//                   shadow-lg
//                   `
//                   :
//                   `
//                   text-slate-400
//                   hover:text-white
//                   hover:bg-white/5
//                   `
//                 }
//                 `}

//               >


//                 <Icon
//                   className={`
//                   text-lg
//                   ${
//                     activeBtn
//                     ?
//                     "text-blue-400"
//                     :
//                     ""
//                   }
//                   `}
//                 />


//                 <span>
//                   {item.label}
//                 </span>


//               </button>

//             );

//           })
//         }


//       </nav>





//       {/* Profile */}

//       <div
//         className="
//         p-4
//         border-t
//         border-white/10
//         "
//       >


//         <div
//           className="
//           flex
//           items-center
//           gap-3
//           p-3
//           rounded-xl
//           bg-white/5
//           border
//           border-white/10
//           mb-3
//           "
//         >


//           <div
//             className="
//             h-10
//             w-10
//             rounded-full
//             bg-gradient-to-br
//             from-blue-500
//             to-purple-500
//             flex
//             items-center
//             justify-center
//             text-white
//             font-bold
//             "
//           >

//             K

//           </div>



//           <div>

//             <p className="text-white text-sm">
//               Kunal
//             </p>

//             <p className="text-xs text-slate-400">
//               Administrator
//             </p>

//           </div>


//         </div>




//         <button
//           className="
//           w-full
//           flex
//           items-center
//           gap-3
//           px-4
//           py-3
//           rounded-xl
//           text-red-400
//           hover:bg-red-500/10
//           transition
//           "
//         >

//           <FiLogOut/>

//           Logout


//         </button>


//       </div>


//     </aside>

//   );

// };


// export default AdminSidebar;



import {
  FiGrid,
  FiUsers,
  FiFileText,
  FiBarChart2,
  FiSettings,
  FiLogOut,
  FiZap,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

const navItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: FiGrid,
  },
  {
    id: "users",
    label: "Users",
    icon: FiUsers,
  },
  {
    id: "notes",
    label: "Notes",
    icon: FiFileText,
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: FiBarChart2,
  },
  {
    id: "settings",
    label: "Settings",
    icon: FiSettings,
  },
];

const AdminSidebar = ({ active, setActive }) => {
  const navigate = useNavigate();

  // ============================================================
  // LOGOUT
  // ============================================================

  const handleLogout = () => {
    const confirmed = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmed) return;

    // Remove authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect to login
    navigate("/login", { replace: true });
  };

  return (
    <aside
      className="
        fixed
        left-0
        top-0
        h-screen
        w-64
        bg-slate-950/90
        backdrop-blur-xl
        border-r
        border-white/10
        flex
        flex-col
        z-50
      "
    >
      {/* ======================================================
          LOGO
      ====================================================== */}

      <div
        className="
          px-6
          py-6
          border-b
          border-white/10
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              h-11
              w-11
              rounded-xl
              bg-gradient-to-br
              from-blue-500
              to-purple-500
              flex
              items-center
              justify-center
              text-white
              shadow-lg
            "
          >
            <FiZap size={22} />
          </div>

          <div>
            <h1 className="text-white font-bold text-lg">
              CampusHub AI
            </h1>

            <p className="text-xs text-slate-400">
              Admin Panel
            </p>
          </div>
        </div>
      </div>

      {/* ======================================================
          NAVIGATION
      ====================================================== */}

      <nav
        className="
          flex-1
          px-4
          py-6
          space-y-2
        "
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const activeBtn = active === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(item.id)}
              className={`
                w-full
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-xl
                transition-all
                duration-300
                ${
                  activeBtn
                    ? `
                      bg-gradient-to-r
                      from-blue-500/20
                      to-purple-500/20
                      text-white
                      border
                      border-blue-400/30
                      shadow-lg
                    `
                    : `
                      text-slate-400
                      hover:text-white
                      hover:bg-white/5
                    `
                }
              `}
            >
              <Icon
                className={`
                  text-lg
                  ${
                    activeBtn
                      ? "text-blue-400"
                      : ""
                  }
                `}
              />

              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* ======================================================
          PROFILE + LOGOUT
      ====================================================== */}

      <div
        className="
          p-4
          border-t
          border-white/10
        "
      >
        <div
          className="
            flex
            items-center
            gap-3
            p-3
            rounded-xl
            bg-white/5
            border
            border-white/10
            mb-3
          "
        >
          <div
            className="
              h-10
              w-10
              rounded-full
              bg-gradient-to-br
              from-blue-500
              to-purple-500
              flex
              items-center
              justify-center
              text-white
              font-bold
            "
          >
            K
          </div>

          <div>
            <p className="text-white text-sm">
              Kunal
            </p>

            <p className="text-xs text-slate-400">
              Administrator
            </p>
          </div>
        </div>

        {/* ==================================================
            LOGOUT BUTTON
        ================================================== */}

        <button
          type="button"
          onClick={handleLogout}
          className="
            w-full
            flex
            items-center
            gap-3
            px-4
            py-3
            rounded-xl
            text-red-400
            hover:bg-red-500/10
            hover:text-red-300
            transition-all
            duration-200
            cursor-pointer
          "
        >
          <FiLogOut />

          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
