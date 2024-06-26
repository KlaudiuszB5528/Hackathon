import { Button } from '@/components/ui/button';
import * as htmlToImage from 'html-to-image';
import jsPDF from 'jspdf';
import { LatLng } from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

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
  promptResponse: string;
  theme: string;
  id: string;
};

const GenerateGamePdf = ({
  city,
  id,
  gameRules,
  participants,
  promptResponse,
}: Props) => {
  let jsonResponse = JSON.parse(promptResponse);
  let points = jsonResponse.points.map((point: any) => {
    return {
      name: point.name,
      coordinates: point.coordinates.split(',').map((coord: string) => {
        return parseFloat(coord);
      }),
    };
  });

  const generatePdf = async () => {
    let cursorY = 0;
    const pageMarginY = 280;
    const incrementCursorY = (increment: number) => {
      cursorY += increment;
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

    // Generate map
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
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(16);
        doc.text('Starting point', 10, 20);
        doc.addImage(dataUrl, 'PNG', 10, 30, 180, 120);
      }
    }

    doc.save('game.pdf');
  };
  if (!points) {
    return <div>loading...</div>;
  }

  const generateImage = () => {
    const node = document.getElementById(`map${id}`);
    if (!node) return;

    return htmlToImage
      .toPng(node)
      .then((dataUrl) => {
        const img = new Image();
        img.src = dataUrl;
        return img;
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      });
  };

  return (
    <div className="flex flex-col w-full">
      <MapContainer
        id={`map${id}`}
        className="w-full h-[200px]"
        zoom={13}
        scrollWheelZoom={false}
        center={points[0].coordinates as LatLng}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          position={points[0].coordinates as LatLng}
          key={points[0].coordinates.toString()}
        />
      </MapContainer>
      <Button onClick={generatePdf} className="bg-fuchsia-700">
        Generate PDF
      </Button>
    </div>
  );
};

export default GenerateGamePdf;
