import { generateGame } from '@/open-ai/ai';
import { jsPDF } from 'jspdf';

type Props = {
  city: string;
  theme: string;
  participants: string;
  points: string;
};

function removePolishCharacters(str: string | null): string {
  const polishCharacters: { [key: string]: string } = {
    ą: 'a',
    ć: 'c',
    ę: 'e',
    ł: 'l',
    ń: 'n',
    ó: 'o',
    ś: 's',
    ź: 'z',
    ż: 'z',
    Ą: 'A',
    Ć: 'C',
    Ę: 'E',
    Ł: 'L',
    Ń: 'N',
    Ó: 'O',
    Ś: 'S',
    Ź: 'Z',
    Ż: 'Z',
  };
  if (!str) return '';
  return str.replace(
    /[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g,
    (match) => polishCharacters[match],
  );
}

export const createPdf = async ({
  city,
  theme,
  participants,
  points,
}: Props) => {
  let cursorY = 0;
  const pageMarginY = 200;

  const incrementCursorY = (increment: number) => {
    cursorY += increment;
    console.log(cursorY);
    if (cursorY >= pageMarginY) {
      doc.addPage();
      cursorY = 10;
    }
  };

  const newGame = await generateGame({ city, participants, points, theme });
  if (!newGame.choices[0].message.content) {
    return;
  }
  const gameDetails = JSON.parse(newGame.choices[0].message.content);
  console.log(gameDetails);

  // Default export is a4 paper, portrait, using millimeters for units
  const doc = new jsPDF();
  const logoImage = new Image();
  logoImage.src = '/logo.png';
  doc.setFont('Helvetica', 'bold');
  incrementCursorY(15);
  doc.addImage(logoImage, 'PNG', 10, cursorY, 40, 40);
  incrementCursorY(25);

  doc.setFontSize(32);
  doc.text('FIELDGAMEZONE', 110, cursorY, { align: 'center' });
  doc.setFontSize(16);

  incrementCursorY(30);
  doc.text('Game Details:', 10, cursorY);
  doc.setFontSize(14);
  incrementCursorY(10);
  doc.text(`City: ${city}`, 10, cursorY);
  incrementCursorY(10);
  doc.text(`Game Theme: ${theme}`, 10, cursorY);
  incrementCursorY(10);
  doc.text(`Number of Participants: ${participants}`, 10, cursorY);

  doc.setFontSize(14);
  incrementCursorY(10);
  doc.text('Game Rules:', 10, cursorY);
  doc.setFontSize(12);
  doc.setFont('Helvetica', 'normal');
  incrementCursorY(10);
  doc.text(removePolishCharacters(gameDetails.gameRules), 10, cursorY, {
    maxWidth: 180,
  });

  incrementCursorY(
    doc.getTextDimensions(removePolishCharacters(gameDetails.gameRules), {
      maxWidth: 180,
    }).h + 10,
  );
  doc.setFontSize(14);
  doc.setFont('Helvetica', 'bold');
  doc.text('Coordinates and names of locations:', 10, cursorY);
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(12);
  incrementCursorY(10);
  if (gameDetails.points.length === 0) {
    doc.text('No points to display', 10, cursorY);
    incrementCursorY(10);
  }
  gameDetails.points.forEach((point: { name: string; coordinates: string }) => {
    doc.text(`${point.name} ${point.coordinates}`, 10, cursorY);
    incrementCursorY(10);
  });

  doc.save('a4.pdf');
};
