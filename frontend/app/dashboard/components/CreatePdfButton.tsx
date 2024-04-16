import { Button } from '@/components/ui/button';
import React from 'react';
import { jsPDF } from 'jspdf';

type Props = {
  city: string;
  theme: string;
  players: number;
  description: string;
};

const createPdfButton = ({ city, theme, players, description }: Props) => {
  const createPdf = () => {
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();
    const logoImage = new Image();
    logoImage.src = '/logo.png';
    doc.setFont('Helvetica', 'bold');
    doc.addImage(logoImage, 'PNG', 10, 10, 25, 25);

    doc.setFontSize(32);
    doc.text('FIELDGAMEZONE', 110, 50, { align: 'center' });
    doc.setFontSize(16);

    doc.text(`Miasto: ${city}`, 10, 70);
    doc.text(`Temat: ${theme}`, 10, 80);
    doc.text(`Liczba graczy: ${players}`, 10, 90);

    doc.setFontSize(14);
    doc.text('Opis:', 10, 100);
    doc.setFontSize(12);
    doc.setFont('Helvetica', 'normal');
    doc.text(description, 10, 110, { maxWidth: 180 });

    doc.save('a4.pdf');
  };

  return (
    <Button onClick={createPdf} className="bg-fuchsia-700">
      createPdfButton
    </Button>
  );
};

export default createPdfButton;
