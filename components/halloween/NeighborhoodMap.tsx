"use client";
import { MapContainer, TileLayer, Marker, Popup, Rectangle, Tooltip, CircleMarker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect, useRef, useState } from "react";
import styles from "./halloween.module.css";
import "leaflet/dist/leaflet.css";
import { addresses } from "@/lib/halloween-addresses";
import { bounds, Home, statuses } from "@/lib/halloween";
const pumpkin = (out = false) => L.divIcon({ html: `<span style="font-size:29px;filter:${out ? "grayscale(1)" : "none"}">🎃</span>`, className: "", iconSize: [34, 36], iconAnchor: [17, 34] });
const selected = L.divIcon({ html: '<span style="font-size:32px">📍</span>', className: "", iconSize: [34, 36], iconAnchor: [17, 34] });
function ZoomTools() {
  const map = useMap();
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => { if (container.current) { L.DomEvent.disableClickPropagation(container.current); L.DomEvent.disableScrollPropagation(container.current); } }, []);
  return <div ref={container} className={styles.zoomTools} role="group" aria-label="Map zoom controls">
    <span>Map zoom</span>
    <button type="button" aria-label="Zoom in on houses" title="Zoom in on houses" onClick={() => map.zoomIn()}>+ <small>Zoom in</small></button>
    <button type="button" aria-label="Zoom out on map" title="Zoom out on map" onClick={() => map.zoomOut()}>− <small>Zoom out</small></button>
    <button type="button" onClick={() => map.fitBounds([[bounds.south,bounds.west],[bounds.north,bounds.east]])}>Reset view</button>
  </div>;
}
function HouseNumbers() {
  const map = useMap();
  const [zoom, setZoom] = useState(map.getZoom());
  useMapEvents({ zoomend() { setZoom(map.getZoom()); } });
  if (zoom < 18) return null;
  return <>{addresses.map(a => <CircleMarker key={a.address} center={[a.lat,a.lng]} radius={1} pathOptions={{opacity:0,fillOpacity:0}} interactive={false}><Tooltip permanent direction="center" className={styles.houseNumber}>{a.number}</Tooltip></CircleMarker>)}</>;
}
function FocusSelection({ point }: { point: [number,number] | null }) {
  const map = useMap();
  useEffect(() => { if (point) map.setView(point, Math.max(map.getZoom(),19)); }, [point,map]);
  return null;
}
function Pick({ onPick, onOutside }: { onPick?: (lat: number, lng: number) => void; onOutside?: () => void }) {
  useMapEvents({ click(e) { if (onPick && e.latlng.lat >= bounds.south && e.latlng.lat <= bounds.north && e.latlng.lng >= bounds.west && e.latlng.lng <= bounds.east) onPick(e.latlng.lat, e.latlng.lng); else if (onPick) onOutside?.(); } });
  return null;
}
export default function NeighborhoodMap({ homes, point, onPick, onOutside }: { homes: Home[]; point: [number, number] | null; onPick?: (lat: number, lng: number) => void; onOutside?: () => void }) {
  return <MapContainer bounds={[[bounds.south, bounds.west], [bounds.north, bounds.east]]} style={{ height: "100%", width: "100%", zIndex: 0 }} scrollWheelZoom={true} touchZoom={true} doubleClickZoom={true} zoomControl={false} maxZoom={21}>
    <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" maxNativeZoom={19} maxZoom={21} />
    <ZoomTools />
    <HouseNumbers />
    <FocusSelection point={point} />
    <Pick onPick={onPick} onOutside={onOutside} />
    {onPick && <Rectangle bounds={[[bounds.south,bounds.west],[bounds.north,bounds.east]]} pathOptions={{color:"#bb6c24",weight:2,dashArray:"6 6",fillOpacity:0}} interactive={false} />}
    {homes.map(h => <Marker key={h.id} position={[h.lat, h.lng]} icon={pumpkin(h.status === "out")}><Tooltip permanent direction="bottom" offset={[0,5]} className={styles.pumpkinLabel}>{h.address}</Tooltip><Popup><strong>{h.address}</strong><br />{statuses[h.status]}<br />{h.hours || "Hours to be determined"}{h.notes && <p>{h.notes}</p>}</Popup></Marker>)}
    {point && <Marker position={point} icon={selected} />}
  </MapContainer>;
}
