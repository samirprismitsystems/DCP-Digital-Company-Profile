export function ChangeView({ coords }: { coords: any }) {
  if (typeof window !== "undefined") {
    // Disable the react-hooks/rules-of-hooks rule for this line
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { latLng } = require("leaflet");
    const { useMap } = require("react-leaflet");
    const map = useMap();
    const center = latLng(coords);
    map.setView(center, 17);
  }
  return null;
}
