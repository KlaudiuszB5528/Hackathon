'use client';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { IAuthContext } from '../Interfaces/IAuthContext';
import { getCookie, deleteCookie } from 'cookies-next';
import GameCard from './GameCard';
import { IGameDetails } from '../Interfaces/IGameDetails';

const User = () => {
  const { userId, loading, setLoading } = useContext(
    AuthContext,
  ) as IAuthContext;
  const [games, setGames] = useState<any>([]);
  console.log(games);
  useEffect(() => {
    const fetchData = async () => {
      // Fetch data from the backend
      try {
        const response = await fetch(`http://localhost:8000/games`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getCookie('token')}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setGames(data);
        }
      } catch (error) {
        // If response is not ok then redirect to sign in page
        deleteCookie('token');
        window.location.href = '/signin';
      }
    };
    setLoading(true);
    fetchData();
    setLoading(false);
  }, [userId, setLoading, setGames]);

  return (
    <div className="w-full h-full p-4 sm:p-10 m-auto space-y-4 lg:grid lg:grid-cols-2 lg:space-y-0 lg:gap-4 xl:grid-cols-3 max-w-screen-2xl">
      {games &&
        games.map((game: IGameDetails) => (
          <GameCard
            key={game.gameId}
            gameId={game.gameId}
            author={game.author}
            city={game.city}
            gameRules={game.gameRules}
            participants={game.participants}
            promptResponse={game.promptResponse}
            theme={game.theme}
            title={game.title}
          />
        ))}
    </div>
  );
};

export default User;
