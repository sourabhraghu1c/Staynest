import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState(() => {
        return JSON.parse(localStorage.getItem("loginUser")) || null;
    });

    // Function to log in and update state
    const login = (user, token) => {
        localStorage.setItem("token", token);
        localStorage.setItem("loginUser", JSON.stringify(user));
        setLoggedInUser(user);
    };

    // Function to log out and update state
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("loginUser");
        setLoggedInUser(null);
    };

    // Update localStorage whenever loggedInUser changes
    useEffect(() => {
        if (loggedInUser) {
            localStorage.setItem("loginUser", JSON.stringify(loggedInUser));
        }
    }, [loggedInUser]);

    useEffect(() => {
        // Sync state when localStorage changes in another tab
        const handleStorageChange = () => {
            setLoggedInUser(JSON.parse(localStorage.getItem("loginUser")));
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    return (
        <AuthContext.Provider value={{ loggedInUser, login, logout, setLoggedInUser }}>
            {children}
        </AuthContext.Provider>
    );
};


// Custom hook to use authentication context
export const useAuth = () => useContext(AuthContext);
