'use client';
import CreateGameForm from './CreateGameForm';
import { LatLng } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import * as htmlToImage from 'html-to-image';

export default function Page() {
  const generateImage = () => {
    const node = document.getElementById('map');
    if (!node) return;
    htmlToImage
      .toPng(node)
      .then((dataUrl) => {
        const img = new Image();
        img.src = dataUrl;
        console.log(img);
        document.body.appendChild(img);
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      });
  };

  return (
    <div className={'flex w-full flex-col items-center'}>
      <CreateGameForm />
      <MapContainer
        id="map"
        className="w-[500px] h-[500px]"
        center={new LatLng(1, 1)}
        zoom={10}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={new LatLng(1, 1)}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      <button onClick={generateImage}>Generate Image</button>
    </div>
  );
}
