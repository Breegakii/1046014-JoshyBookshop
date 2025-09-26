import { createBrowserRouter } from "react-router-dom";
import GuestLayout from "./components/layouts/GuestLayout";
import HomePage from "./pages/Homepage";
import DefaultLayout from "./components/layouts/DefaultLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductPage from "./pages/ProductPage";
import ProductList from "./pages/ProductList";
import CartPage from "./pages/CartPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedLayout from "./components/layouts/ProtectedLayout";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {path: '/', element: <HomePage />},
            {path: '/products', element: <ProductList />},
            {path: '/products/:id', element: <ProductPage />},
            {path: '/cart', element: <CartPage />},
            {path: '/about', element: <AboutPage />},
            {path: '/contact', element: <ContactPage />},
        ]
    },
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {path: '/login', element: <Login />},
            {path: '/register', element: <Register />},
        ]
    },
    {
        path: '/',
        element: <ProtectedLayout />,
        children: [
            {path: '/profile', element: <ProfilePage />},
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
])

export default router;