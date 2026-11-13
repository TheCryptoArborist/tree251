# Mobile Tree Permit Checker — live GIS verification

Date: November 13, 2026. Feature: Address and map 0.3.0.
Scope: existing tree251 draft PR #9; not production and not a permit authorization.

## Observed live address results

The official City address query returned one candidate: **6 MAURY DR**, ZIP 36606, address object ID 30622.
Its address reference point was longitude -88.11021672256123, latitude 30.688215800720513.
An exact-point query returned a MOBILE corporate-limit polygon, no local historic-district polygon, and zoning **R-1 / Single-Family Residential** with Suburban subdistrict and overlay value N/A.
An exact-point parcel query returned parcel R022908191001020.000, with the undeveloped flag No. This flag was not treated as proof of a habitable building or legal ownership.
No matching Planning Commission Approvals record was returned at this point. This is not evidence that no approved site or landscape plan exists.
These are address-point observations, not a determination about an actual tree on the property.

Evidence: live public-data workflow run 43457008417, job 131993678555, approximately 15:52 UTC.
https://github.com/TheCryptoArborist/tree251/actions/runs/43457008417

## Hosted gateway and browser verification

Workflow run 43459395919, job 132001964697, completed successfully at approximately 16:07 UTC.
https://github.com/TheCryptoArborist/tree251/actions/runs/43459395919

The actual hosted preview and same-origin API were tested, not a mocked address response. All eight configured City context layers returned usable responses in that run: corporate limits, local historic districts, current UDC zoning, neighborhood overlays, parcels, City property, parks, and Planning Commission Approvals.
The context query searches within 25 meters, so it returned five nearby parcels. An exact-point query returned one parcel. Nearby results must not be presented as if all parcels contain the tree.

A real Chrome browser at 390 by 844 pixels verified:
- Live address candidate and real imagery loading.
- No automatic jurisdiction answer from address selection alone; the map pin must be confirmed.
- City-limit, local-historic and R-1/R-2 answers populated from the map; ownership and approved-plan answers stayed unknown.
- The previously defined seven-inch-limb, live-oak, ROW pruning test still returned Commission review and the ISA Certified Arborist requirement. ROW was a test input, not a GIS ownership determination for 6 Maury.
- The editable Forestry email included the address, map-source provenance, and arborist guidance. No email was sent.
- Changing the address invalidated the prior screening and email.
- A controlled API outage left jurisdiction unknown rather than producing an exemption.
- Mobile document width equaled viewport width (390 px); no overflow elements or page-script errors were reported.

Separately, 22 local unit tests passed for polygon inclusion, holes, ambiguous overlaps, boundary caution, unknown/malformed responses, limited autofill, and special-district suggestions. Test source: scripts/test-mobile-tree-map-data.mjs.

## Sources used

Address: https://maps.cityofmobile.org/arcgis/rest/services/Address_Points_MS/MapServer/0
Corporate limits: https://maps.cityofmobile.org/arcgis/rest/services/Operational_Map_Data1_MS/MapServer/0
Local historic districts: https://maps.cityofmobile.org/arcgis/rest/services/Operational_Map_Data1_MS/MapServer/7
UDC zoning (not archived zoning or future land use): https://maps.cityofmobile.org/arcgis/rest/services/Portal_Operational_Layers/PLAN_ZONE_APP_MS/MapServer/10
Neighborhood overlays: https://maps.cityofmobile.org/arcgis/rest/services/Portal_Operational_Layers/PLAN_ZONE_APP_MS/MapServer/3
Parcel details: https://maps.cityofmobile.org/arcgis/rest/services/Parcel_Details_MS/MapServer/0
City property: https://maps.cityofmobile.org/arcgis/rest/services/Operational_Map_Data1_MS/MapServer/2
Parks: https://maps.cityofmobile.org/arcgis/rest/services/Operational_Map_Data1_MS/MapServer/10
Planning approval leads: https://maps.cityofmobile.org/arcgis/rest/services/EG_Data_MS/MapServer/55

## Limits retained

This verifies the tested workflow, not citywide data accuracy, coverage, legal ownership, the actual location of any tree, or physical iPhone Safari behavior. The 15-meter caution band is a conservative application setting, not a legal setback or guarantee of map accuracy. An address point is not a tree position. A parcel gap is not proof of public ROW. City property may be owned or leased. An absent planning record does not resolve plan obligations. Positive GIS overlay suggestions do not rule out other approvals. Fetch timestamps are not dataset amendment dates.
No Chapter 65 rules or Chapter 64 decision logic were changed by this mapping work. Production has not been merged or deployed by these changes.
