import Navbar from "./components/header/Navbar";
import Sidebar from "./components/header/Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Navbar />
      <div className="sm:flex flex-none">
        <div>
          <Sidebar />
        </div>
        <div className="sm:flex-1">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;
