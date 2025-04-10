
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

const MainLayout = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} />
      
      <div className="flex flex-1">
        {/* Sidebar - hidden on mobile by default */}
        <Sidebar isOpen={sidebarOpen} />
        
        {/* Main content */}
        <main className={`flex-1 transition-all duration-300 p-4 md:p-6`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
