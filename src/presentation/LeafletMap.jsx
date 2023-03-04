import { MapContainer, TileLayer, GeoJSON, Popup, Tooltip, Polygon } from 'react-leaflet';
import { MapKey } from './MapKey';
import { Slider } from './Slider';


export function LeafletMap({
  width,
  height,
  data,
  children
}) {

  return (
    <>
      <MapContainer style={{ height: '100%', width: '100%' }} center={[40, 17]} zoom={4} scrollWheelZoom={false}>
        <TileLayer
          attribution='Tiles &copy; Esri &mdash; Source: Esri '
          url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}' />
        {children}
      </MapContainer>
      <Slider />
      {/* <MapKey /> */}
    </>
  )
};

// export const M_LeafletMap = memo(LeafletMap);
