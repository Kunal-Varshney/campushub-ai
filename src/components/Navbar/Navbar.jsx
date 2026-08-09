import { useState, useEffect } from "react";
import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  Menu,
  X,
  ArrowRight,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";


function Navbar() {

  const [open, setOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const navigate = useNavigate();

  const location = useLocation();

  const links = [

  {
    name: "Home",
    type: "page",
    path: "/",
  },

  {
    name: "Features",
    type: "section",
    id: "features",
  },

  {
    name: "Reviews",
    type: "section",
    id: "reviews",
  },

  {
    name: "About",
    type: "page",
    path: "/about",
  },

  {
    name: "Careers",
    type: "page",
    path: "/careers",
  },

  {
    name: "Contact",
    type: "section",
    id: "contact",
  },

];

const handleNavigation = (item) => {

  setOpen(false);

  if (item.type === "page") {

    navigate(item.path);

    return;

  }

  if (location.pathname !== "/") {

    navigate("/");

    setTimeout(() => {

      const element = document.getElementById(item.id);

      if (element) {

        element.scrollIntoView({
          behavior: "smooth",
        });

      }

    }, 150);

  } else {

    const element = document.getElementById(item.id);

    if (element) {

      element.scrollIntoView({
        behavior: "smooth",
      });

    }

  }

};

const handleSignUp = () => {

  setOpen(false);

  navigate("/signup");

};

  return (

    <header className="
      sticky
      top-0
      z-50
      border-b
      border-slate-800/60
      bg-slate-950/80
      backdrop-blur-xl
    ">


      <div className="
        max-w-7xl
        mx-auto
        px-6
        py-4
        flex
        items-center
        justify-between
      ">


        {/* Logo */}

        <h1 
          className="
            text-3xl
            font-extrabold
            tracking-wide
            text-indigo-400
            cursor-pointer
          "
        >

          CampusHub
          
          <span className="text-white">
            AI
          </span>

        </h1>





        {/* Desktop Links */}

        <nav
          className="
            hidden
            md:flex
            items-center
            gap-8
            text-slate-300
          "
        >

          {

            links.map((item, index) => (

              item.type === "page"

              ?

              <Link

                key={index}

                to={item.path}

                className={`
                  transition
                  hover:text-indigo-400
                  ${
                    location.pathname === item.path
                      ? "text-indigo-400 font-semibold"
                      : ""
                  }
                `}

              >

                {item.name}

              </Link>

              :

              <button

                key={index}

                onClick={() => handleNavigation(item)}

                className="
                  transition
                  hover:text-indigo-400
                  bg-transparent
                  border-none
                  cursor-pointer
                "

              >

                {item.name}

              </button>

            ))

          }

        </nav>





        {/* Right side — Desktop Sign Up + Mobile Hamburger */}

        <div
          className="
            flex
            items-center
            gap-4
          "
        >

          {/* Desktop Sign Up */}

          {/* Desktop Sign Up */}

          {!isLoggedIn && (
            <button

              onClick={handleSignUp}

              className="
                hidden
                md:flex
                items-center
                gap-2
                rounded-xl
                bg-gradient-to-r
                from-indigo-600
                to-blue-600
                px-5
                py-2.5
                font-semibold
                text-white
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:from-indigo-500
                hover:to-blue-500
                hover:shadow-lg
                hover:shadow-indigo-500/30
                active:scale-95
              "

            >

              Sign Up

              <ArrowRight size={16} />

            </button>
          )}
                    

          {/* Hamburger — Mobile only */}

          <button

            onClick={() => setOpen(!open)}

            className="
              md:hidden
              rounded-xl
              border
              border-slate-700
              p-2
              text-white
              transition-all
              duration-300
              hover:border-indigo-500
              hover:bg-slate-900
              hover:scale-105
            "

          >

            {
              open
              ?
              <X size={24}/>
              :
              <Menu size={24}/>
            }


          </button>

        </div>


      </div>





      {/* Mobile Menu */}

      <AnimatePresence>

      {
        open && (

          <motion.div

            initial={{
              opacity:0,
              height:0
            }}

            animate={{
              opacity:1,
              height:"auto"
            }}

            exit={{
              opacity:0,
              height:0
            }}

            transition={{
              duration:0.35
            }}

            className="
              md:hidden
              border-t
              border-slate-800
              bg-slate-950
              overflow-hidden
            "

          >


            <nav className="
              flex
              flex-col
              gap-5
              px-6
              py-6
              text-slate-300
            ">


              {
                links.map((item,index)=>(

                  <button
                    key={index}
                    onClick={() => handleNavigation(item)}
                    className="
                      transition
                      hover:text-indigo-400
                      text-left
                    "
                  >

                    {item.name}
                  </button>
                

                ))
              }



             {!isLoggedIn && (
              <button

                onClick={handleSignUp}

                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  bg-gradient-to-r
                  from-indigo-600
                  to-blue-600
                  hover:from-indigo-500
                  hover:to-blue-500
                  rounded-xl
                  py-3
                  font-semibold
                  text-white
                  transition
                  active:scale-95
                "

              >

                Sign Up

                <ArrowRight size={18}/>

              </button>
            )}

            </nav>


          </motion.div>

        )
      }

      </AnimatePresence>


    </header>

  );

}


export default Navbar;







