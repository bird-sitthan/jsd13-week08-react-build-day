import { Outlet } from "react-router-dom";
import { Navbar } from "../Components/Navbar";
import { Footer } from "../Components/Footer";

function Layout() {
  return (
    <div className="min-h-screen bg-slate-100 p-2.5 sm:p-4 md:p-6 text-slate-800 antialiased">
      <div className="max-w-7xl mx-auto">
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
