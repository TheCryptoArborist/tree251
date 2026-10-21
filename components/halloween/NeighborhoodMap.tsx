"use client";
import { MapContainer, TileLayer, Marker, Popup, Rectangle, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { bounds, Home, statuses } from "@/lib/halloween";
const pumpkin = (out = false) => L.divIcon({ html: `<span style="font-size:29px;filter:${out ? "grayscale(1)" : "none"}">🎃</span>`, className: "", iconSize: [34, 36], iconAnchor: [17, 34] });
const selected = L.divIcon({ html: '<span style="font-size:32px">📍</span>', className: "", iconSize: [34, 36], iconAnchor: [17, 34] });
function Pick({ onPick, onOutside }: { onPick?: (lat: number, lng: number) => void; onOutside?: () => void }) {
  useMapEvents({ click(e) { if (onPick && e.latlng.lat >= bounds.south && e.latlng.lat <= bounds.north && e.latlng.lng >= bounds.west && e.latlng.lng <= bounds.east) onPick(e.latlng.lat, e.latlng.lng); else if (onPick) onOutside?.(); } });
  return null;
}
export default function NeighborhoodMap({ homes, point, onPick, onOutside }: { homes: Home[]; point: [number, number] | null; onPick?: (lat: number, lng: number) => void; onOutside?: () => void }) {
  return <MapContainer bounds={[[bounds.south, bounds.west], [bounds.north, bounds.east]]} style={{ height: "100%", width: "100%", zIndex: 0 }} scrollWheelZoom={false}>
    <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    <Pick onPick={onPick} onOutside={onOutside} />
    {onPick && <Rectangle bounds={[[bounds.south,bounds.west],[bounds.north,bounds.east]]} pathOptions={{color:"#bb6c24",weight:2,dashArray:"6 6",fillOpacity:0}} interactive={false} />}
    {homes.map(h => <Marker key={h.id} position={[h.lat, h.lng]} icon={pumpkin(h.status === "out")}><Popup><strong>{h.address}</strong><br />{statuses[h.status]}<br />{h.hours || "Hours to be determined"}{h.notes && <p>{h.notes}</p>}</Popup></Marker>)}
    {point && <Marker position={point} icon={selected} />}
  </MapContainer>;
}
