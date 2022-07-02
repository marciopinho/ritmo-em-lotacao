import * as L from 'leaflet';

type LatLng = L.LatLng;

type LatLngMap<T> = { [k: T]: LatLng };

const latLng = ([lat, lng]: number[]) => L.latLng(lat, lng);

const interpolateCoord = (a: LatLng, b: LatLng, p: number): LatLng => {
  return [a.lat + (b.lat - a.lat) * p, a.lng + (b.lng - a.lng) * p];
};

const avgCoord = (coords: LatLng[]): LatLng => {
  let latAcc = 0;
  let lngAcc = 0;
  coords.forEach(({ lat, lng }: LatLng) => {
    latAcc += lat;
    lngAcc += lng;
  });
  return [latAcc / coords.length, lngAcc / coords.length];
};

export { latLng, LatLng, LatLngMap, interpolateCoord, avgCoord };