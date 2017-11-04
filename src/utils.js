import firebase from './config/firebase'

export async function saveLocation(place, latlng) {
  let ref = firebase.database().ref('locations')
  let existing = await ref.orderByChild('place_id').equalTo(place.place_id).once('value')
  if (existing.numChildren()) return
  let location = {
    place_id: place.place_id,
    name: place.name,
    phone: place.international_phone_number || '',
    website: place.website || '',
    latlng
  }
  console.log(location)
  ref.push(location).then(console.log).catch(console.log)
}

export async function locationsFromStorage() {
  let ref = firebase.database().ref('locations')
  let res = (await ref.once('value')).toJSON()
  let locations = []
  for(let id in res){
    let location = res[id]
    location.firebaseId = id
    locations.push(location)
  }
  console.log(locations)
  return locations
}
