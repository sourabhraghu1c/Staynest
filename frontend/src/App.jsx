import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";  // Import AuthProvider
import Layout from "./components/Layout";
import Index from './pages/Index';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Show from './pages/Show';
import AddRental from './pages/AddRental';
import UpdateRental from "./pages/UpdateRental";
import Filtereddata from "./pages/Filtereddata";
import ProfileSettings from "./pages/ProfileSettings";
import Services from "./pages/Services";

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
                </Routes>
            </Layout>
        </AuthProvider>
    );
};

export default App;
