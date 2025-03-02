
// import React, { createContext, useEffect, useState } from "react";
// import axios from "axios";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
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
//         <AuthContext.Provider value={{ user, setUser }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };


