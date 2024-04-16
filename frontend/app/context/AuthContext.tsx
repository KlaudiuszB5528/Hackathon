'use client';

import { deleteCookie, getCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';
import { createContext, useEffect, useState } from 'react';
import { IAuthContext } from '../Interfaces/IAuthContext';
import { IJWTPayload } from '../Interfaces/IJWTPayload';
import { IUser } from '../Interfaces/IUser';

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userId, setUserId] = useState<number | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<IUser | null>(null);

  useEffect(() => {
    // Reads the token from the cookie and decodes it
    // If it fails then redirect to sign in page
    setLoading(true);
    const tokenCookie = getCookie('token');
    if (!tokenCookie) {
      window.location.href = '/signin';
    } else {
      const tokenString = tokenCookie.toString();
      // Try to decode cookie and check if it is a valid token
      try {
        const decodedToken = jwtDecode(tokenString) as IJWTPayload;
        if (decodedToken.userId && decodedToken.role) {
          setUserId(decodedToken.userId);
          setRole(decodedToken.role);
        }
        // If token does not contain teamId then redirect to sign in page
        else {
          deleteCookie('token');
          window.location.href = '/signin';
        }
      } catch (error) {
        // If decoding fails then redirect to sign in page
        // delete token cookie
        deleteCookie('token');
        window.location.href = '/signin';
      }
    }
    setLoading(false);
  }, [setUserId, setRole]);

  useEffect(() => {
    // If userId is not set then redirect to sign in page
    if (userId === null) {
      return;
    }
    setLoading(true);
    const fetchData = async () => {
      // Fetch data from the backend
      try {
        const response = await fetch(`http://localhost:8000/users/${userId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getCookie('token')}`,
          },
          next: { tags: ['team'] },
        });
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          setLoading(false);
        }
      } catch (error) {
        // If response is not ok then redirect to sign in page
        deleteCookie('token');
        window.location.href = '/signin';
      }
    };
    fetchData();
  }, [userId, setUserData]);

  return (
    <AuthContext.Provider
      value={{
        loading,
        setLoading,
        userId,
        role,
        userData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
