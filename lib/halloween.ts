export const PUBLIC_FIELDS = "id,address,lat,lng,status,hours,notes";
export const bounds = { south: 30.6835, north: 30.6892, west: -88.113, east: -88.1055 };
export type Home = { id: string; address: string; lat: number; lng: number; status: string; hours: string; notes: string };
export const statuses: Record<string, string> = { candy: "Handing out candy", treats: "Non-candy treats", out: "All out / finished" };
export function validateHome(b: Record<string, unknown>) {
  const address = typeof b.address === "string" ? b.address.trim().replace(/\s+/g, " ") : "";
  const hours = typeof b.hours === "string" ? b.hours.trim() : "";
  const notes = typeof b.notes === "string" ? b.notes.trim() : "";
  if (!/^\d+[A-Za-z-]*\s+.{3,100}$/.test(address)) throw new Error("Enter your house number and street name.");
  if (typeof b.lat !== "number" || typeof b.lng !== "number" || !Number.isFinite(b.lat) || !Number.isFinite(b.lng) || b.lat < bounds.south || b.lat > bounds.north || b.lng < bounds.west || b.lng > bounds.east) throw new Error("Tap your home within the neighborhood map.");
  if (typeof b.status !== "string" || !Object.hasOwn(statuses, b.status)) throw new Error("Choose a participation status.");
  if (hours.length > 80 || notes.length > 300) throw new Error("Keep hours under 80 characters and notes under 300 characters.");
  return { address, lat: b.lat, lng: b.lng, status: b.status, hours, notes };
}
