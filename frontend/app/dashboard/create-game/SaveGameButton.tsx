import { AuthContext } from '@/app/context/AuthContext';
import { IAuthContext } from '@/app/Interfaces/IAuthContext';
import { Button } from '@/components/ui/button';
import { getCookie } from 'cookies-next';
import { Loader } from 'lucide-react';
import { useContext, useState } from 'react';
import { toast } from 'sonner';

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
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useContext(AuthContext) as IAuthContext;

  const saveGame = async () => {
    setIsLoading(true);
    try {
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
        toast.success('Game saved successfully');
      }
    } catch (error) {
      toast.error('Failed to save game');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      type="button"
      className="w-32"
      disabled={props.disabled}
      onClick={saveGame}
    >
      {isLoading ? <Loader className="animate-spin" /> : 'Save Game'}
    </Button>
  );
};

export default SaveGameButton;
