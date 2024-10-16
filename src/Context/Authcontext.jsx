import React, { createContext, useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getToken, setToken, removeToken } from '../Services/Auth';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = getToken();
        const lastRoute = sessionStorage.getItem('lastRoute'); // Use sessionStorage

        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                if (decodedToken.exp * 1000 < Date.now()) {
                    console.log('Token has expired');
                    navigate('/log-in');
                } else {
                    setUser(decodedToken);
                    if (lastRoute) {
                        navigate(lastRoute); // Navigate to the last route if it exists
                    }
                }
            } catch (error) {
                console.error('Invalid token');
            }
        }
    }, []);

    const signup = (token) => {
        setToken(token); // Store the token in local storage
        try {
            const decodedToken = jwtDecode(token);
            setUser(decodedToken);
            navigate('/default'); // Navigate to the default page after signup
        } catch (error) {
            console.error('Error decoding token on signup', error);
        }
    };

    const login = (token) => {
        setToken(token); // Store the token in local storage
        try {
            const decodedToken = jwtDecode(token);
            setUser(decodedToken);
            navigate('/default'); // Navigate to the default page after login
        } catch (error) {
            console.error('Error decoding token on login', error);
        }
    };

    const logout = () => {
        setUser(null);
        removeToken();
        navigate('/log-in');
    };

    const requireAuth = (Component) => {
        if (user) {
            sessionStorage.setItem('lastRoute', window.location.pathname); // Store current route before navigation in sessionStorage
            return <Component />;
        } else {
            return <Navigate to="/log-in" />;
        }
    };

    const preventAuthAccess = (Component) => {
        return user ? <Navigate to="/default" /> : <Component />;
    };

    return (
        <AuthContext.Provider value={{user, login, signup, logout, requireAuth, preventAuthAccess}}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };
export default AuthContext;
