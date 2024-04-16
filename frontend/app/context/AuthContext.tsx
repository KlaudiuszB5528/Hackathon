'use client';

import { deleteCookie, getCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';
import { createContext, useEffect, useState } from 'react';
import { IAuthContext } from '../Interfaces/IAuthContext';
import { IJWTPayload } from '../Interfaces/IJWTPayload';
import { ITeamData } from '../Interfaces/ITeamData';
import { ITeamFile } from '../Interfaces/ITeamFile';
import { ITeamMember } from '../Interfaces/ITeamMember';

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [shouldUpdate, setShouldUpdate] = useState<boolean>(false);
  const [teamId, setTeamId] = useState<number | null>(null);
  const [teamDataLoading, setTeamDataLoading] = useState(true);
  const [teamData, setTeamData] = useState<ITeamData | null>(null);
  const [teamMembers, setTeamMembers] = useState<ITeamMember[] | null>(null);
  const [teamFiles, setTeamFiles] = useState<ITeamFile[] | null>(null);

  useEffect(() => {
    // Reads the token from the cookie and decodes it
    // If it fails then redirect to sign in page
    const tokenCookie = getCookie('token');
    if (!tokenCookie) {
      window.location.href = '/signin';
    } else {
      const tokenString = tokenCookie.toString();
      // Try to decode cookie and check if it is a valid token
      try {
        const decodedToken = jwtDecode(tokenString) as IJWTPayload;
        if (decodedToken.teamId) {
          setTeamId(decodedToken.teamId);
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
  }, [setTeamId]);

  useEffect(() => {
    // If teamId is not set then redirect to sign in page
    if (teamId === null) {
      return;
    }
    setTeamDataLoading(true);
    const fetchData = async () => {
      // Fetch data from the backend
      try {
        const response = await fetch(`http://localhost:8000/teams/${teamId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getCookie('token')}`,
          },
          next: { tags: ['team'] },
        });
        if (response.ok) {
          const data = await response.json();
          setTeamData(data);
          setTeamDataLoading(false);
        }
      } catch (error) {
        // If response is not ok then redirect to sign in page
        deleteCookie('token');
        window.location.href = '/signin';
      }
    };
    const fetchTeamMembers = async () => {
      // Fetch data from the backend
      try {
        const response = await fetch(
          `http://localhost:8000/members/team/${teamId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${getCookie('token')}`,
            },
          },
        );
        if (response.ok) {
          const data = await response.json();
          setTeamMembers(data);
        }
      } catch (error) {
        // If response is not ok then redirect to sign in page
        deleteCookie('token');
        window.location.href = '/signin';
      }
    };
    const fetchTeamFiles = async () => {
      // Fetch data from the backend
      try {
        const response = await fetch(
          `http://localhost:8000/files/team/${teamId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${getCookie('token')}`,
            },
          },
        );
        if (response.ok) {
          const data = await response.json();
          setTeamFiles(data);
        }
      } catch (error) {
        // If response is not ok then redirect to sign in page
        deleteCookie('token');
        window.location.href = '/signin';
      }
    };

    if (shouldUpdate) {
      fetchData();
      fetchTeamMembers();
      fetchTeamFiles();
      setShouldUpdate(false);
      return;
    }

    fetchData();
    fetchTeamMembers();
    fetchTeamFiles();
  }, [teamId, setTeamData, shouldUpdate]);

  return (
    <AuthContext.Provider
      value={{
        setShouldUpdate,
        teamData,
        setTeamData,
        teamDataLoading,
        setTeamDataLoading,
        teamMembers,
        setTeamMembers,
        teamFiles,
        setTeamFiles,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
