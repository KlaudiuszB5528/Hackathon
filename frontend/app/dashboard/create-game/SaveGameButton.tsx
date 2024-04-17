import { AuthContext } from '@/app/context/AuthContext';
import { IAuthContext } from '@/app/Interfaces/IAuthContext';
import { Button } from '@/components/ui/button';
import { getCookie } from 'cookies-next';
import React, { useContext } from 'react';

type Props = {
  disabled: boolean;
  title: string;
  participants: number;
  gameRules: string;
  city: string;
  promptResponse: string;
  theme: string;
};

const SaveGameButton = (props: Props) => {
  const { userId } = useContext(AuthContext) as IAuthContext;

  const saveGame = async () => {
    const response = await fetch('http://localhost:8000/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('token')}`,
      },
      body: JSON.stringify({
        title: props.title,
        participants: props.participants,
        gameRules: props.gameRules,
        city: props.city,
        promptResponse: props.promptResponse,
        theme: props.theme,
        authorId: userId,
      }),
    });

    if (response.ok) {
      console.log('Game saved successfully');
    } else {
      console.error('Failed to save game');
    }
  };

  return (
    <Button type="button" disabled={props.disabled} onClick={saveGame}>
      SaveGameButton
    </Button>
  );
};

export default SaveGameButton;
