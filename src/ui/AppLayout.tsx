import { Footer } from "../components/Footer/Footer";
import { Header } from "../pages/Home/Header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <Header />
      <div className="wrapper">
        <div className="content">
          <Outlet />
        </div>
        <footer className="footer">
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default AppLayout;
