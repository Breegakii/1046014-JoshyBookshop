import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DefaultLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header showAuthButtons={false} />
      <main className="flex-grow">
        <Outlet />
        <ToastContainer />
      </main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;