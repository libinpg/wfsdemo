import Map from 'ol/Map.js';
import VectorSource from 'ol/source/Vector.js';
import View from 'ol/View.js';
import XYZ from 'ol/source/XYZ.js';
import {GeoJSON, WFS} from 'ol/format.js';
import {Stroke, Style} from 'ol/style.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';

import {
  and as andFilter,
  equalTo as equalToFilter,
  like as likeFilter,
} from 'ol/format/filter.js';

const vectorSource = new VectorSource();
const vector = new VectorLayer({
  source: vectorSource,
  style: new Style({
    stroke: new Stroke({
      color: 'rgba(0, 0, 255, 1.0)',
      width: 2,
    }),
  }),
});

const key = '';
const attributions =
  '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
  '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

const raster = new TileLayer({
  source: new XYZ({
    attributions: attributions,
    url: 'https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=' + key,
    maxZoom: 20,
  }),
});

const map = new Map({
  layers: [raster, vector],
  target: document.getElementById('map'),
  view: new View({
    center: [-8908887.277395891, 5381918.072437216],
    maxZoom: 19,
    zoom: 12,
  }),
});

// generate a GetFeature request
const featureRequest = new WFS().writeGetFeature({
  srsName: 'EPSG:4326',
  featureNS: 'https://xxx/geoserver/TestLoading',
  featurePrefix: 'TestLoading',
  featureTypes: ['TestLoading:testgeoserverwfs'],
  outputFormat: 'application/json',
  // filter: andFilter(
  //   likeFilter('name', 'Mississippi*'),
  //   equalToFilter('waterway', 'riverbank')
  // ),
});

// then post the request and add the received features to a layer
fetch('https://xxx/geoserver/TestLoading/ows?', {
  method: 'POST',
  body: new XMLSerializer().serializeToString(featureRequest),
})
  .then(function (response) {
    console.log(response.features);
    return response.json();
  })
  .then(function (json) {
    const features = new GeoJSON().readFeatures(json);
    console.log(features);
    vectorSource.addFeatures(features);
    map.getView().fit(vectorSource.getExtent());
  });
