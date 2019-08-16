import { createAction } from 'redux-actions'

const defaultCoordinate = { lat: 51.5, lng: 0, zoom: 10 }

export const setCoordinate = createAction('SET_COORDINATE')
export const feathCoordinate = (payload) => {
  return function (dispatch) {
    navigator.geolocation.getCurrentPosition(function (position) {
      dispatch(setCoordinate({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        zoom: defaultCoordinate.zoom
      }))
    }, function () {
      dispatch(setCoordinate(defaultCoordinate))
    })
  }
}
