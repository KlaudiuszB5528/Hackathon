import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: 'sk-proj-DUo5Ac1gsJQo5QgMjBz2T3BlbkFJquymB0AZg2IdpDBgijfC',
  dangerouslyAllowBrowser: true,
});

export interface Game {
  city: string;
  participants: number;
}

export async function generateGame({ city, participants }: Game) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `Wygeneruj grę terenową dla miasta ${city}, podaj 4 punkty i ich współrzędne na mapie, gra dla ${participants} uczestników.Odpowiedź podaj w formacie JSON. Schemat JSONA to:{
    "city": "...",
    "points": [],
    "participants": 8,
    "gameRules": "..."
          }`,
      },
    ],
    model: 'gpt-3.5-turbo-0125',
  });

  return completion;
}
