import addresses from "./data/cromwell-addresses.json";
// City of Mobile GIS public Address layer, neighborhood extract retrieved 2026-10-21.
// https://services3.arcgis.com/AcvBA1fcgucsFQvO/ArcGIS/rest/services/ADDRESS/FeatureServer/0
export { addresses };
export type AddressPoint = (typeof addresses)[number];
export function normalizeAddress(input: string) {
  return input.split(",")[0].toUpperCase().replace(/\bMOBILE\b.*$/, "").replace(/\bDRIVE\b/g,"DR").replace(/\bSTREET\b/g,"ST").replace(/\bCOURT\b/g,"CT").replace(/\bLANE\b/g,"LN").replace(/\bAVENUE\b/g,"AVE").replace(/\bNORTH\b/g,"N").replace(/\bSOUTH\b/g,"S").replace(/\bEAST\b/g,"E").replace(/\bWEST\b/g,"W").replace(/[^A-Z0-9]/g,"");
}
export function findAddresses(input: string) {
  const q = normalizeAddress(input);
  if (q.length < 3) return [];
  const exact = addresses.filter(a => normalizeAddress(a.address) === q);
  return exact.length ? exact : addresses.filter(a => normalizeAddress(a.address).startsWith(q)).slice(0,8);
}
