import axios from 'axios'

const CURRENT_CITY = 'current_city'
function getCity() {
  return JSON.parse(localStorage.getItem(CURRENT_CITY))
}
export function setCity(city) {
  localStorage.setItem(CURRENT_CITY, JSON.stringify(city))
}
export function getCurrentCity() {
  const city = getCity()
  if (!city) {
    return new Promise((resolve, reject) => {
      const myCity = new window.BMap.LocalCity()
      myCity.get(result => {
        const name = result.name
        axios
          .get('http://localhost:8080/area/info', {
            params: {
              name: name
            }
          })
          .then(res => {
            const { body } = res.data

            setCity(body)

            resolve(body)
          })
          .catch(err => {
            reject(err)
          })
      })
    })
  } else {
    return Promise.resolve(city)
  }
}
