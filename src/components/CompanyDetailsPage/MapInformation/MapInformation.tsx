import { IMap } from "@/types/commonTypes";
import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

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

interface IMapInformationProps {
  mapLocation: IMap;
  isChange: boolean;
  setIsChange: (value: boolean) => void;
}

const MapInformation = (props: IMapInformationProps) => {
  const objForm = useFormContext();
  const [mapLocation, setMapLocation] = useState<IMap>({
    lat: props.mapLocation.lat || 21.1875694,
    lon: props.mapLocation.lon || 72.8147383,
    displayname: props.mapLocation.displayname || "",
  });

  const handleChangeMarker = async (event: any) => {
    const { lat, lng } = event.target.getLatLng();
    if (lat && lng) {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        );
        const newDisplayName = response.data.display_name;
        objForm.setValue("mapLocation.lat", lat);
        objForm.setValue("mapLocation.lon", lng);
        objForm.setValue("mapLocation.displayName", newDisplayName);
        setMapLocation({
          lat: lat,
          lon: lng,
          displayname: newDisplayName,
        });
      } catch (error) {
        console.error("Error fetching display name:", error);
      }
    }
  };

  const getDisplayName = async (latitude: string, longitude: string) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      return response.data.display_name;
    } catch (error) {
      console.error("Error fetching display name:", error);
      return null;
    }
  };

  const loadData = async () => {
    try {
      const position: any = await getGEOCurrentPosition();
      const { latitude, longitude } = position;
      const displayName = await getDisplayName(latitude, longitude);
      objForm.setValue("mapLocation.lat", latitude);
      objForm.setValue("mapLocation.lon", longitude);
      objForm.setValue("mapLocation.displayName", displayName);
    } catch (error) {
      console.error("Error getting current location:", error);
    }
  };

  const getGEOCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => resolve(position.coords),
          (error) => reject(error)
        );
      } else {
        reject("Geolocation is not supported by this browser.");
      }
    });
  };

  // useEffect(() => {
  //   loadData();
  // }, []);

  useEffect(() => {
    if (props.isChange) {
      setMapLocation({
        lat: props.mapLocation.lat,
        lon: props.mapLocation.lon,
        displayname: props.mapLocation.displayname,
      });
      props.setIsChange(false);
    }
  }, [props.isChange]);

  return (
    <MapContainer
      center={[mapLocation.lat, mapLocation.lon]}
      zoom={17}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url={`http://{s}.tile.osm.org/{z}/{x}/{y}.png`}
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker
        position={[mapLocation.lat, mapLocation.lon]}
        draggable={true}
        eventHandlers={{ dragend: handleChangeMarker }}
      >
        <Popup>{mapLocation.displayname}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapInformation;
