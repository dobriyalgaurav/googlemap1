import { addClickEventsToLocations, getUserGeoLocation } from "./events";
import { getLocations } from "./location.ts";

// Initialize and add the map
let map: google.maps.Map;
async function initMap(): Promise<void> {
  // Request needed libraries.
  //@ts-ignore
  const { Map, InfoWindow } = (await google.maps.importLibrary(
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
  const infoWindow = new InfoWindow();
  getLocations().forEach((loc) => {
    const divElement = document.createElement("div");
    const beachFlagImg = document.createElement("img");
    beachFlagImg.src =
      "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
    divElement.appendChild(beachFlagImg);
    divElement.className = "beachflag";
    divElement.setAttribute("data-label", loc.title);
    const marker = new AdvancedMarkerElement({
      map: map,
      position: loc,
      content: divElement,
      title: loc.title,
    });
    //@ts-ignore
    marker.addListener("click", ({ domEvent, latLng }) => {
      //@ts-ignore
      const { target } = domEvent;
      infoWindow.close();
      infoWindow.setContent(marker.title);
      infoWindow.open(marker.map, marker);
    });
  });
  addClickEventsToLocations(map);
  getUserGeoLocation(map);
}
initMap();
