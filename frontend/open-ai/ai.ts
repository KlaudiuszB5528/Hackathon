import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export interface Game {
  city: string;
  participants: string;
  points: string;
  theme: string;
}

export async function generateGame({
  city,
  participants,
  points,
  theme,
}: Game) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `Generate an outdoor game for the city of ${city},first check if the city exists if not return JSON object with message city does not exist, provide complete game rules,the theme of the game is ${theme}, specify ${points} points,their coordinates on the map (in format latitude,longitude only number part) and the name of the localization,for each point provide a list of puzzles at it,provide A list of required props (numerical locks, puzzles, necessary gadgets. Game should be designed for ${participants} participants. Provide the answer in JSON format. The JSON schema is:{
    "city": "...",
    "points": [{
        "name": "...",
        "coordinates": "...",
        "puzzles": ["...", "...", "..."],
        "requiredProps": ["...", "..."]
    }],
    theme: "...",
    "participants": 8,
    "gameRules": "..."
          }`,
      },
    ],
    model: 'gpt-3.5-turbo-0125',
  });

  return completion;
}
