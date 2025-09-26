import { Outlet } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from './Header';
import Footer from './Footer';

const GuestLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header showAuthButtons={true} />
      <main className="flex-grow">
        <Outlet />
        <ToastContainer />
      </main>
      <Footer />
    </div>
  );
};

export default GuestLayout;