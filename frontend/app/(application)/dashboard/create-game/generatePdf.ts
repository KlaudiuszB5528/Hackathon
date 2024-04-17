import { jsPDF } from 'jspdf';
import { generateImage } from './create-game-form.helper';

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

export const createPdf = async (content: string, gameRules: string) => {
  let cursorY = 0;
  const pageMarginY = 280;

  const incrementCursorY = (increment: number) => {
    cursorY += increment;
    if (cursorY >= pageMarginY) {
      doc.addPage();
      cursorY = 25;
    }
  };

  const gameDetails = JSON.parse(content);

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
  doc.text(`City: ${removePolishCharacters(gameDetails.city)}`, 10, cursorY);
  incrementCursorY(10);
  doc.text(`Game Theme: ${gameDetails.theme}`, 10, cursorY);
  incrementCursorY(10);
  doc.text(`Number of Participants: ${gameDetails.participants}`, 10, cursorY);

  doc.setFontSize(14);
  incrementCursorY(10);
  doc.text('Game Rules:', 10, cursorY);
  doc.setFontSize(12);
  doc.setFont('Helvetica', 'normal');
  incrementCursorY(10);
  doc.text(removePolishCharacters(gameRules), 10, cursorY, {
    maxWidth: 180,
  });

  incrementCursorY(
    doc.getTextDimensions(removePolishCharacters(gameRules), {
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
  gameDetails.points.forEach(
    (point: {
      name: string;
      coordinates: string;
      puzzles: string[];
      requiredProps: string[];
    }) => {
      doc.setFont('Helvetica', 'bold');
      doc.text(`${point.name} ${point.coordinates}`, 10, cursorY);
      incrementCursorY(10);
      doc.setFont('Helvetica', 'normal');
      point.puzzles.forEach((puzzle: string) => {
        doc.text(`Puzzle: ${puzzle}`, 10, cursorY);
        incrementCursorY(10);
      });
      point.requiredProps.forEach((prop: string) => {
        doc.text(`Required: ${prop}`, 10, cursorY);
        incrementCursorY(10);
      });
    },
  );
  incrementCursorY(10);
  doc.text('Map on next page', 10, cursorY);

  const generatedImage = await generateImage();
  if (generatedImage) {
    const canvas = document.createElement('canvas');
    canvas.width = generatedImage.width;
    canvas.height = generatedImage.height;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(generatedImage, 0, 0);
      const dataUrl = canvas.toDataURL('image/png');
      doc.addPage();
      doc.addImage(dataUrl, 'PNG', 10, 15, 180, 180);
    }
  }

  doc.save('a4.pdf');
  return true;
};
