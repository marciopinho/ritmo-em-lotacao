import * as h3 from 'h3-js';
import * as L from 'leaflet';
import geojson2h3 from 'geojson2h3';

import { hslToHex } from 'src/color';
import { HexBins } from 'src/hexBins';

export type HexBinLayer = L.GeoJSON;
type CountFeature = { count: number };

const style: L.StyleFunction<CountFeature> = (feature?) => {
  const count = feature?.properties.count || 0;
  const max = 15;
  const h = 0.2 - 0.2 * Math.min(count / max, 1.0); // 0.2 (green) -> 0 (red)
  return {
    stroke: false,
    fill: true,
    fillColor: hslToHex(h, 1, 0.4),
  };
};

export const drawHexBins = (bins: HexBins): HexBinLayer => {
  const geojson = geojson2h3.h3SetToFeatureCollection(
    Object.keys(bins),
    (id) => ({
      center: h3.h3ToGeo(id), // TODO: cache coords
      count: bins[id],
    })
  );

  return L.geoJSON(geojson, {
    style,
    // onEachFeature: (_feat, layer) => layer.on({ click: hexLayerOnClick }),
  });
};
