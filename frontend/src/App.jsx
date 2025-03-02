//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//import './App.css';
// import Home from "./pages/Home";
// import ResponsiveAppBar from "./components/Navbar";


// function App() {
  //  const [user, setUser] = useState(null); // State to store the user's data

  //   // Fetch the current user's data when the component mounts
  //   useEffect(() => {
  //       const fetchUser = async () => {
  //           try {
  //               const response = await axios.get('http://localhost:8080/api/current_user', { withCredentials: true });
  //               setUser(response.data.user); // Set the user data in state
  //           } catch (error) {
  //               console.error("Error fetching user data:", error);
  //               setUser(null); // No user is logged in
  //           }
  //       };

  //       fetchUser();
  //   }, []);

  // return (
  //   <>
  //   return <Home />;
  //   </>
  // );




  // return (
  //   <Router>
  //     <Routes>
  //       <Route path="/" element={
  //       <>
  //       <Navbar />
  //       <Success />
  //       </>
  //       } />
  //       <Route path="/login" element={<Login />} />
  //       <Route path="/signup" element={<Signup />} />
  //       <Route path="/success" element={<Success />} />
  //     </Routes>
  //   </Router>
  // );
// }

// export default App;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Layout from "./components/Layout";
// import Index from './pages/Index';
// import Login from './pages/login';
// import Signup from './pages/Signup';
// import Show from './pages/Show';
// import { AuthContext } from "./context/AuthContext"; // Import AuthContext

// const App = () => {
//   const { user } = useContext(AuthContext); // Get user data from context
//   return (
//     <Router>
//       <Layout>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/" element={<Index user={user} />} />
//           <Route path="/rentals/:id" element={<Show user={user} />} />
//         </Routes>
//       </Layout>
//     </Router>
//   );
// };

// export default App;


// import React, { useContext } from "react"; // ✅ Import useContext
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Layout from "./components/Layout";
// import Index from "./pages/Index";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Show from "./pages/Show";
// import { AuthContext } from "./context/AuthContext"; // Import AuthContext

// const App = () => {
//   const { user } = useContext(AuthContext); // Get user data from context

//   return (
//     <Router>
//       <Layout>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/" element={<Index />} />
//           <Route path="/rentals/:id" element={<Show />} />
//         </Routes>
//       </Layout>
//     </Router>
//   );
// };

// export default App;

// import React, { useContext } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Layout from "./components/Layout";
// import Index from './pages/Index';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Show from './pages/Show';
// import {useEffect, useState } from "react";
// import axios from "axios";


// const App = () => {

//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const response = await axios.get("http://localhost:8080/api/current_user", { withCredentials: true });
//                 setUser(response.data.user);
//             } catch (error) {
//                 console.error("Error fetching user data:", error);
//                 setUser(null);
//             }
//         };
//         fetchUser();
//     }, []);
    
//     return (
//         <Router>
//             <Layout>
//                 <Routes>
//                     <Route path="/login" element={<Login />} />
//                     <Route path="/signup" element={<Signup />} />
//                     <Route path="/" element={<Index />} />
//                     <Route path="/rentals/:id" element={<Show />} />
//                 </Routes>
//             </Layout>
//         </Router>
//     );
// };

// export default App;



import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from './pages/Index';
import Login from './pages/login';
import Signup from './pages/Signup';
import Show from './pages/Show';
import axios from "axios";

const App = () => {
    const [user, setUser] = useState(null);
    const [redirectPath, setRedirectpath] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/current_user", { withCredentials: true });
                setUser(response.data.user);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setUser(null);
            }
        };
        fetchUser();
    }, []);

    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/login" element={<Login  user={user} setUser={setUser} redirectPath={redirectPath} setRedirectpath={setRedirectpath} />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/" element={<Index user={user} redirectPath={redirectPath} setRedirectpath={setRedirectpath} />} />
                    <Route path="/rentals/:id" element={<Show />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;
