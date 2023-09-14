export function ChangeView({ coords }: { coords: any }) {
  if (typeof window !== "undefined") {
    const { latLng } = require("leaflet");
    const { useMap } = require("react-leaflet");
    const map = useMap();
    const center = latLng(coords);
    map.setView(center, 17);
  }
  return null;
}
