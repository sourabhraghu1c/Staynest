import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";  // Import AuthProvider
import Layout from "./components/Layout";
import Index from './pages/Index';
import Login from './pages/login';
import Signup from './pages/Signup';
import Show from './pages/Show';
import AddRental from './pages/AddRental';
import UpdateRental from "./pages/UpdateRental";
import Filtereddata from "./pages/Filtereddata";
import ProfileSettings from "./pages/ProfileSettings";
import Services from "./pages/Services";
import AboutUs from "./pages/AboutUs";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import AllRoommates from "./pages/AllRoommates";
import ShowRoommate from './pages/ShowRoomate';
import AddRoommate from "./pages/AddRoommate";

const App = () => {
    return (
        <AuthProvider>
            <Layout>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/" element={<Index />} />
                    <Route path="/rentals/:id" element={<Show />} />
                    <Route path="/rentals/:id/edit" element={<UpdateRental />} />
                    <Route path="/rentals/new" element={<AddRental />} />
                    <Route path="/rentals" element={<Filtereddata />} />
                    <Route path="/profile-settings" element={<ProfileSettings />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/Roommates" element={<AllRoommates />} />
                    <Route path="/rentalpartner/:id" element={<ShowRoommate />} />
                    <Route path="/rentalpartner/new" element={<AddRoommate />} />
                </Routes>
            </Layout>
        </AuthProvider>
    );
};

export default App;
