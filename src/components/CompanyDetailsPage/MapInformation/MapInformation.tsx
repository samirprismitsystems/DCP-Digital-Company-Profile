import dynamic from "next/dynamic";
const MapContainer = dynamic(
  () => import("react-leaflet").then((module) => module.MapContainer),
  {
    ssr: false, // Disable server-side rendering
  }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((module) => module.TileLayer),
  {
    ssr: false, // Disable server-side rendering
  }
);

const Marker = dynamic(
  () => import("react-leaflet").then((module) => module.Marker),
  {
    ssr: false,
  }
);

const Popup = dynamic(
  () => import("react-leaflet").then((module) => module.Popup),
  {
    ssr: false,
  }
);

const MapInformation = ({
  lat,
  lon,
  displayName,
  setMapData,
}: {
  lat: number;
  lon: number;
  displayName: string;
  setMapData: ({ lat, lng, displayName }: any) => void;
}) => {
  const handleChangeMarker = (event: any) => {
    const { lat, lng } = event.target.getLatLng();
    setMapData({
      lat: lat,
      lon: lng,
      displayName: "",
    });
  };

  return (
    <MapContainer
      center={[lat, lon]}
      zoom={17}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url={`http://{s}.tile.osm.org/{z}/{x}/{y}.png`}
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker
        position={[lat, lon]}
        draggable={true}
        eventHandlers={{ dragend: handleChangeMarker }}
      >
        <Popup content={displayName}></Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapInformation;
