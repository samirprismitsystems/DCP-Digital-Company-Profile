import { ChangeView } from "@/components/Dashboard/CompanyDetailsPage/MapInformation/ChangeView";
import { ThemeContextApi } from "@/pages/[slug]";
import { IMap } from "@/types/commonTypes";
import axios from "axios";
import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";

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

export default function Map(props: any) {
    const objCompany = useContext(ThemeContextApi).company;
    const [mapLocation, setMapLocation] = useState<IMap>({
        lat: Number(objCompany.map_lat),
        lon: Number(objCompany.map_lng),
        displayname: "",
    });


    const loadData = async () => {
        if (objCompany.map_lat && objCompany.map_lng) {
            try {
                const response = await axios.get(
                    `https://nominatim.openstreetmap.org/reverse?lat=${Number(objCompany.map_lat)}&lon=${Number(objCompany.map_lng)}&format=json`
                );
                const newDisplayName = response.data.display_name;
                setMapLocation({
                    lat: Number(objCompany.map_lat),
                    lon: Number(objCompany.map_lng),
                    displayname: newDisplayName,
                });
            } catch (error) {
                console.error("Error fetching display name:", error);
            }
        }
    };


    useEffect(() => {
        loadData();
    }, [])

    if (!objCompany) return null;
    return (
        <>
            <div
                className={`content-box gallery-box xs:min-h-[300px] md:min-h-full p-0 overflow-hidden mx-4 ${props.height}`}
            >
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
                        draggable={false}
                    >
                        <Popup>{mapLocation.displayname}</Popup>
                    </Marker>
                    <ChangeView coords={[mapLocation.lat, mapLocation.lon]} />
                </MapContainer>
            </div>
        </>
    );
}
