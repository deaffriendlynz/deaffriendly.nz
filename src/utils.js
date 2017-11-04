export function saveLocation(place, latlng) {
  let locations = JSON.parse(window.localStorage.getItem('locations')) || []
  if (locations.find(loc => loc.place_id === place.place_id)) {return}
  let location = {
    place_id: place.place_id,
    name: place.name,
    phone: place.international_phone_number,
    website: place.website,
    icon: place.icon,
    latlng
  }
  locations.push(location)
  window.localStorage.setItem('locations', JSON.stringify(locations))
}

export function locationsFromStorage() {
  return JSON.parse(window.localStorage.getItem('locations')) || []
}
