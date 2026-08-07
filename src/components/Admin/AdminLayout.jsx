import { useState } from "react";

import AdminSidebar from "../../components/Admin/AdminSidebar";

import AdminDashboard from "./AdminDashboard";
import AdminUsers from "./AdminUsers";
import AdminNotes from "./AdminNotes";
import AdminAnalytics from "./AdminAnalytics";
import AdminSettings from "./AdminSettings";


const AdminLayout = () => {

  const [activeSection, setActiveSection] = useState("dashboard");


  const renderContent = () => {

    switch(activeSection){

      case "dashboard":
        return <AdminDashboard />;

      case "users":
        return <AdminUsers />;

      case "notes":
        return <AdminNotes />;

      case "analytics":
        return <AdminAnalytics />;

      case "settings":
        return <AdminSettings />;

      default:
        return <AdminDashboard />;

    }

  };


  return (

    <div className="min-h-screen bg-slate-950 text-white">

      <AdminSidebar
        active={activeSection}
        setActive={setActiveSection}
      />


      <div className="lg:ml-64">

        {renderContent()}

      </div>


    </div>

  );

};


export default AdminLayout;