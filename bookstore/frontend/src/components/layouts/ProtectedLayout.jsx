import { Navigate, Outlet } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from './Header';
import Footer from './Footer';
import authStorage from '../../auth/storage'
import { useContext, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';

export default function ProtectedLayout() {
    let token = localStorage.getItem('authToken');
    const getToken = (key) => {
      token = authStorage.getToken(key)
    }
    const {user} = useContext(AuthContext)
    useEffect(() => {
      getToken('authToken')
    }, [user])
    if (!token) return <Navigate to='/login' />
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header showAuthButtons={true} />
      <main className="flex-grow">
        <Outlet />
        <ToastContainer />
      </main>
      <Footer />
    </div>
  )
}
