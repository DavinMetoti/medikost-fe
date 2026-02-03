import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { ProductDetail } from '../../../services/product/product.service';
import { useEffect } from 'react';

// Type declaration for leaflet-routing-machine
interface RoutingControlOptions {
  waypoints: L.LatLng[];
  routeWhileDragging?: boolean;
  addWaypoints?: boolean;
  createMarker?: () => null;
  show?: boolean;
}

interface RoutingNamespace {
  control(options: RoutingControlOptions): L.Control;
}

declare module 'leaflet' {
  export const Routing: RoutingNamespace;
}

interface MapComponentProps {
  product: ProductDetail;
}

// Fix for default markers in react-leaflet
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Custom icons
const kostIcon = L.icon({
  iconUrl: "/images/house.png", // Local house icon
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  shadowSize: [41, 41]
});

const hospitalIcon = L.icon({
  iconUrl: "/images/hospital.png", // Local hospital icon
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  shadowSize: [41, 41]
});

const RoutingComponent: React.FC<{ product: ProductDetail }> = ({ product }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !product.latitude || !product.longitude) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(parseFloat(product.latitude), parseFloat(product.longitude)),
        L.latLng(-6.9942118, 110.4049148)
      ],
      routeWhileDragging: false,
      addWaypoints: false,
      createMarker: () => null,
      show: false
    }).addTo(map);

    return () => {
      try {
        if (map && routingControl) {
          map.removeControl(routingControl);
        }
      } catch (error) {
        console.warn('Error removing routing control:', error);
      }
    };
  }, [map, product.latitude, product.longitude]);

  return null;
};

export default function MapComponent({ product }: MapComponentProps) {
  // Since this component is dynamically imported with ssr: false,
  // it only renders on the client side, so we can safely render the map
  const mounted = true;

  // Check if coordinates are available
  const hasCoordinates = product.latitude && product.longitude && 
    !isNaN(parseFloat(product.latitude)) && !isNaN(parseFloat(product.longitude));

  if (!hasCoordinates) {
    return (
      <div className="w-full h-64 rounded-lg overflow-hidden border bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin mx-auto mb-2 text-gray-400">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <p className="text-gray-600 font-medium">Koordinat lokasi tidak tersedia</p>
          <p className="text-sm text-gray-500">Peta tidak dapat ditampilkan</p>
        </div>
      </div>
    );
  }

  if (!mounted) {
    return (
      <div className="w-full h-64 rounded-lg overflow-hidden border bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-2"></div>
          <p className="text-gray-600 font-medium">Memuat peta...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-64 rounded-lg overflow-hidden border">
      <MapContainer center={[parseFloat(product.latitude), parseFloat(product.longitude)]} zoom={15} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[parseFloat(product.latitude), parseFloat(product.longitude)]} icon={kostIcon}>
          <Popup>{product.name}</Popup>
        </Marker>
        <Marker position={[-6.9942118, 110.4049148]} icon={hospitalIcon}>
          <Popup>RSUP Dr. Kariadi</Popup>
        </Marker>
        <RoutingComponent product={product} />
      </MapContainer>
    </div>
  );
}