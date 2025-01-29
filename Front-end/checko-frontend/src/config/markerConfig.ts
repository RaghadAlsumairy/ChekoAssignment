import * as L from 'leaflet'
import { apllicationConfig } from './application.config'


const imgs= apllicationConfig.imgs

export const defaultMarker = new L.Icon({
    iconUrl : imgs.marker.defaultMarker,
    iconSize: [30,40],
    popupAnchor:[0,0]
})

export const selectedMarker = new L.Icon({
    iconUrl : imgs.marker.selectedMArker,
    iconSize: [30,40],
    popupAnchor:[0,0]
})