import { Outlet } from "react-router-dom";
import { Navbar } from "../Components/Navbar";
import { Footer } from "../Components/Footer";

function Layout() {
  return (
    <div>
      <Navbar />
      {/* addcartForm page component children */}
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
