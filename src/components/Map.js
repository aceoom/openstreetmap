import _ from 'lodash'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Map as MapLayer, TileLayer } from 'react-leaflet-universal'
import queryString from 'query-string'

import 'leaflet/dist/leaflet.css'

import { setCoordinate, feathCoordinate } from '../redux/actions/coordinate'

function Map (props) {
  useEffect(function () {
    const coordinatesNotDefinedProps = _.some([_.isNull(props.coordinate.zoom), _.isNull(props.coordinate.lat), _.isNull(props.coordinate.lng)])
    if (coordinatesNotDefinedProps) {
      const queryCoordinate = queryString.parse(props.location.search)
      const coordinatesNotDefinedQuery = _.some([_.isNil(queryCoordinate.zoom), _.isNil(queryCoordinate.lat), _.isNil(queryCoordinate.lng)])
      if (coordinatesNotDefinedQuery) {
        props.feathCoordinate()
      } else props.setCoordinate(_.mapValues(queryCoordinate, (v) => _.parseInt(v)))
    }
  }, [props.coordinate.zoom, props.coordinate.lat, props.coordinate.lng])

  function handleViewportChanged ({ center, zoom }) {
    const [lat, lng] = center
    const search = queryString.stringify({ lat, lng, zoom })
    props.history.push({ search })
  }

  const possition = [props.coordinate.lat || 0, props.coordinate.lng || 0]

  return (
    <MapLayer center={possition} zoom={props.coordinate.zoom || 3} onViewportChanged={handleViewportChanged}>
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
    </MapLayer>
  )
}

Map.propTypes = {
  coordinate: PropTypes.exact({
    zoom: PropTypes.number,
    lat: PropTypes.number,
    lng: PropTypes.number
  }).isRequired,
  setCoordinate: PropTypes.func,
  feathCoordinate: PropTypes.func,
  location: PropTypes.any,
  history: PropTypes.any
}

function mapStateToProps (state) {
  return { coordinate: state.coordinate }
}

function mapDispatchToProps (dispatch) {
  return {
    setCoordinate: (value) => dispatch(setCoordinate(value)),
    feathCoordinate: () => dispatch(feathCoordinate())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Map))
