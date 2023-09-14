import { latLng } from "leaflet";
import { useMap } from "react-leaflet";

export function ChangeView({ coords }: { coords: any }) {
  const map = useMap();
  const center = latLng(coords);
  map.setView(center, 17);

  return null;
}
