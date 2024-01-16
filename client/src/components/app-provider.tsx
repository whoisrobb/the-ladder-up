import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '@/lib/utils';

interface JwtPayload {
  userId: number;
  username: string;
  email: string;
}

interface AppContextValue {
  user: JwtPayload | null;
  setUser: React.Dispatch<React.SetStateAction<JwtPayload | null>>;
  handleLogout: () => void; // Add handleLogout to the context value
  handleRegister: (firstName: string, lastName: string, username: string, email: string, password: string) => Promise<void>; // Add handleRegister to the interface
  handleLogin: (value: string, password: string) => Promise<void>;
}

const AppContext = createContext<AppContextValue>({
  user: null,
  setUser: () => {},
  handleLogout: () => {},
  handleRegister: async () => {},
  handleLogin: async () => {},
});

export const useApp = () => {
    const context = useContext(AppContext);
  
    if (!context) {
      throw new Error('useUserContext must be used within an AppProvider');
    }
  
    return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
  const [user, setUser] = useState<JwtPayload | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const decoded = jwtDecode<JwtPayload>(accessToken); // Use jwtDecode<JwtPayload> for type safety
      setUser(decoded);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
  };
  
const handleRegister = async (firstName: string, lastName: string, username: string, email: string, password: string) => {
    try {
      const response = await fetch(`${serverUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, username, email, password }),
      });
      if (response.ok) {
        const data = await response.json(); // Assuming API returns a JWT token
        localStorage.setItem('accessToken', data.token);
        setUser(jwtDecode<JwtPayload>(data.token)); // Update user state
        navigate('/');
      } else {
        const errorData = await response.json();
        console.error(errorData);
      }
    } catch (err) {
        console.error(err);
    }
  };
  
  const handleLogin = async (value: string, password: string) => {
    try {
      const response = await fetch(`${serverUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value, password }),
      });

        if (response.ok) {
            const { token } = await response.json();
            localStorage.setItem('accessToken', token);
            setUser(jwtDecode<JwtPayload>(token));
        } else {
            const errorData = await response.json();
            console.error(errorData);
        }
    } catch (err) {
        console.error(err);
    }
  };

  return (
    <AppContext.Provider value={{ user, setUser, handleLogout, handleRegister, handleLogin }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;