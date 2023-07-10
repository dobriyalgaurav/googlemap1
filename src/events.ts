import { getLocations } from "./location.ts";

export function addClickEventsToLocations(map: google.maps.Map) {
  getLocations().forEach((element) => {
    let locationButton = document.createElement("button");
    locationButton.textContent = element.title;
    locationButton.classList.add("button-6");
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(locationButton);
    locationButton.addEventListener("click", () => {
      map.panTo(element);
    });
  });
}

export function getUserGeoLocation(map: google.maps.Map) {
  const locationButton = document.createElement("button");
  const infoWindow = new google.maps.InfoWindow();
  locationButton.textContent = "Get User's Location";
  locationButton.classList.add("button-32");

  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          map.panTo(pos);
          const marker = new google.maps.marker.AdvancedMarkerElement({
            map: map,
            position: pos,
          });
          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
        },
        () => {
          handleLocationError(map, true, infoWindow, map.getCenter()!);
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(map, false, infoWindow, map.getCenter()!);
    }
  });
}

function handleLocationError(
  map: google.maps.Map,
  browserHasGeolocation: boolean,
  infoWindow: google.maps.InfoWindow,
  pos: google.maps.LatLng
) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}
