
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from './pages/Index';
import Login from './pages/login';
import Signup from './pages/Signup';
import Show from './pages/Show';
import AddRental from './pages/AddRental';
import UpdateRental from "./pages/UpdateRental";
import Map from "./components/Map";
import Filtereddata from "./pages/Filtereddata"
// import ProfileSettings from "./pages/ProfileSettings";


const App = () => {
    return (
            <Layout>
                <Routes>
                    <Route path="/login" element={<Login/>} />
                    <Route path="/signup" element={<Signup/>} />
                    <Route path="/" element={<Index/>} />
                    <Route path="/rentals/:id" element={<Show />} />
                    <Route path="/rentals/:id/edit" element={<UpdateRental />} />
                    <Route path="/rentals/new" element={<AddRental />} /> 
                    <Route path="/rentals" element={<Filtereddata />} /> 
                    {/* <Route path="/map" element={<Map address={`Ashoknagar,Madhya Pradesh,473331`} apiKey={"Un_W_f19QGiNLknQ46oRe1SeLHTT02J4X5Zs1h6-5UY"}/>}  />
                     */}
                    {/* <Route path="/profile-settings" element={<ProfileSettings/>} /> */}
                </Routes>
            </Layout>
    );
};

export default App;



