import { addClickEventsToLocations, getUserGeoLocation } from "./events";
import { getLocations } from "./location.ts";

// Initialize and add the map
let map: google.maps.Map;
async function initMap(): Promise<void> {
  // Request needed libraries.
  //@ts-ignore
  const { Map } = (await google.maps.importLibrary(
    "maps"
  )) as google.maps.MapsLibrary;
  const { AdvancedMarkerElement } = (await google.maps.importLibrary(
    "marker"
  )) as google.maps.MarkerLibrary;
  map = new Map(document.getElementById("map") as HTMLElement, {
    zoom: 12,
    center: getLocations()[0],
    mapId: "test_id",
  });

  getLocations().forEach((loc) => {
    new AdvancedMarkerElement({
      map: map,
      position: loc,
      title: loc.title,
    });
  });
  addClickEventsToLocations(map);
  getUserGeoLocation(map);
}
initMap();
