import firebase from './config/firebase'

const ref = firebase.database().ref('locations')

export async function saveLocation(place, latlng, category) {
  let existing = await ref.orderByChild('place_id').equalTo(place.place_id).once('value')
  if (existing.numChildren()) return
  let location = {
    place_id: place.place_id,
    name: place.name,
    category,
    phone: place.international_phone_number || '',
    website: place.website || '',
    latlng
  }
  ref.push(location)
}

export async function locationsFromStorage() {
  let snapshot = (await ref.once('value')).toJSON()
  return objectToArray(snapshot)
}

export function listenForLocations(cb) {
  ref.on('value', (snapshot) => {
    cb(objectToArray(snapshot.val()))
  })
}

function objectToArray(obj) {
  let locations = []
  for(let id in obj){
    let location = obj[id]
    location.firebaseId = id
    locations.push(location)
  }
  return locations
}
