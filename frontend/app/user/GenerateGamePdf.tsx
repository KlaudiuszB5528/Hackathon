import { Button } from '@/components/ui/button';
import jsPDF from 'jspdf';
import React from 'react';

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

type Props = {
  city: string;
  gameRules: string;
  participants: number;
  theme: string;
};

const GenerateGamePdf = ({ city, gameRules, participants, theme }: Props) => {
  const generatePdf = () => {
    let cursorY = 0;
    const pageMarginY = 280;

    const incrementCursorY = (increment: number) => {
      cursorY += increment;
      console.log(cursorY);
      if (cursorY >= pageMarginY) {
        doc.addPage();
        cursorY = 25;
      }
    };

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
    doc.text(`City: ${removePolishCharacters(city)}`, 10, cursorY);
    incrementCursorY(10);
    doc.text(`Number of Participants: ${participants}`, 10, cursorY);

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

    doc.save('game.pdf');
  };

  return (
    <Button onClick={generatePdf} className="bg-fuchsia-700">
      Generate PDF
    </Button>
  );
};

export default GenerateGamePdf;
