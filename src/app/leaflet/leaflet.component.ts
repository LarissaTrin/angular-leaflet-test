import { Component, OnInit, AfterViewInit } from '@angular/core';
import { icon, latLng, marker, polyline, tileLayer } from 'leaflet';
import * as Leaflet from 'leaflet';
declare var L: any;

import * as turf from '@turf/turf';
import * as bbox from '@turf/bbox';
import * as bboxPolygon from '@turf/bbox-polygon';
import * as intersect from '@turf/intersect';

import 'leaflet-area-select/src/Map.SelectArea.js';

@Component({
  selector: 'app-leaflet',
  templateUrl: './leaflet.component.html',
  styleUrls: ['./leaflet.component.css'],
})
export class LeafletComponent implements OnInit, AfterViewInit {
  public map: any;

  public baseLayers: any;
  public baseMaps: any;

  public intersectingFeatures: any = [];

  constructor() {}

  ngOnInit() {
    const osmAttr =
      "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>, " +
      "Tiles courtesy of <a href='http://hot.openstreetmap.org/' target='_blank'>Humanitarian OpenStreetMap Team</a>";

    this.baseMaps = {
      OpenStreetMap: L.tileLayer(
        'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
        {
          attribution: osmAttr,
        }
      ),
    };

    const mapOpts = {
      center: new L.LatLng(-22.91112338681864, -43.23614447993302),
      zoom: 16,
    };

    this.map = new L.Map('leaflet-map', mapOpts, { selectArea: false });

    // constant for OSM Base Layer
    const osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      osmAttrib =
        '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      osm = L.tileLayer(osmUrl, { maxZoom: 100, attribution: osmAttrib }),
      drawnItems = L.featureGroup().addTo(this.map);

    // object with base layers shows dof by default
    this.baseLayers = {
      osm: osm.addTo(this.map),
      google: L.tileLayer(
        'https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}',
        {
          attribution: 'google',
          maxZoom: 100,
        }
      ),
    };

    this.map.selectArea.enable();

    L.geoJSON(this.geojson).addTo(this.map);

    return this.map;
  }

  myStyle = {
    color: '#ff7800',
    weight: 5,
    opacity: 0.65,
  };

  ngAfterViewInit() {
    this.map.on({
      areaselected: (e) => {
        console.log(e);

        let clickBounds = [e.bounds.toBBoxString()];

        console.log(clickBounds.map((s) => s.replace(/"/g, '')));

        this.intersectingFeatures = [];

        let geojsonLayer = L.geoJson(this.geojson, {
          style: function (feature) {
            return {
              color: 'red',
              fill: true,
              opacity: 1,
              fillOpacity: 0.001,
              weight: 1,
            };
          },
          onEachFeature: function (feature, layer) {
            debugger;

            let bounds = turf.bbox(feature);
            let bboxToPolygon = turf.bboxPolygon(bounds);

            let poly1 = turf.polygon(bboxToPolygon.geometry.coordinates);
            let poly2 = turf.polygon(feature.geometry.coordinates);

            let intersection = turf.intersect(poly1, poly2);

            if (intersection != null) {
              layer.setStyle({
                color: '#ff7800',
                weight: 5,
                opacity: 0.65,
              });
            }
          },
        });
      },
    });
  }

  geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        id: 'HRV',
        properties: {
          name: 'Croatia',
        },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [18.829838, 45.908878],
              [19.072769, 45.521511],
              [19.390476, 45.236516],
              [19.005486, 44.860234],
              [18.553214, 45.08159],
              [17.861783, 45.06774],
              [17.002146, 45.233777],
              [16.534939, 45.211608],
              [16.318157, 45.004127],
              [15.959367, 45.233777],
              [15.750026, 44.818712],
              [16.23966, 44.351143],
              [16.456443, 44.04124],
              [16.916156, 43.667722],
              [17.297373, 43.446341],
              [17.674922, 43.028563],
              [18.56, 42.65],
              [18.450016, 42.479991],
              [17.50997, 42.849995],
              [16.930006, 43.209998],
              [16.015385, 43.507215],
              [15.174454, 44.243191],
              [15.37625, 44.317915],
              [14.920309, 44.738484],
              [14.901602, 45.07606],
              [14.258748, 45.233777],
              [13.952255, 44.802124],
              [13.656976, 45.136935],
              [13.679403, 45.484149],
              [13.71506, 45.500324],
              [14.411968, 45.466166],
              [14.595109, 45.634941],
              [14.935244, 45.471695],
              [15.327675, 45.452316],
              [15.323954, 45.731783],
              [15.67153, 45.834154],
              [15.768733, 46.238108],
              [16.564808, 46.503751],
              [16.882515, 46.380632],
              [17.630066, 45.951769],
              [18.456062, 45.759481],
              [18.829838, 45.908878],
            ],
          ],
        },
      },
      {
        type: 'Feature',
        id: 'HUN',
        properties: {
          name: 'Hungary',
        },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [16.202298, 46.852386],
              [16.534268, 47.496171],
              [16.340584, 47.712902],
              [16.903754, 47.714866],
              [16.979667, 48.123497],
              [17.488473, 47.867466],
              [17.857133, 47.758429],
              [18.696513, 47.880954],
              [18.777025, 48.081768],
              [19.174365, 48.111379],
              [19.661364, 48.266615],
              [19.769471, 48.202691],
              [20.239054, 48.327567],
              [20.473562, 48.56285],
              [20.801294, 48.623854],
              [21.872236, 48.319971],
              [22.085608, 48.422264],
              [22.64082, 48.15024],
              [22.710531, 47.882194],
              [22.099768, 47.672439],
              [21.626515, 46.994238],
              [21.021952, 46.316088],
              [20.220192, 46.127469],
              [19.596045, 46.17173],
              [18.829838, 45.908878],
              [18.456062, 45.759481],
              [17.630066, 45.951769],
              [16.882515, 46.380632],
              [16.564808, 46.503751],
              [16.370505, 46.841327],
              [16.202298, 46.852386],
            ],
          ],
        },
      },
      {
        type: 'Feature',
        id: 'MKD',
        properties: {
          name: 'Macedonia',
        },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [20.59023, 41.85541],
              [20.71731, 41.84711],
              [20.76216, 42.05186],
              [21.3527, 42.2068],
              [21.576636, 42.245224],
              [21.91708, 42.30364],
              [22.380526, 42.32026],
              [22.881374, 41.999297],
              [22.952377, 41.337994],
              [22.76177, 41.3048],
              [22.597308, 41.130487],
              [22.055378, 41.149866],
              [21.674161, 40.931275],
              [21.02004, 40.842727],
              [20.60518, 41.08622],
              [20.46315, 41.51509],
              [20.59023, 41.85541],
            ],
          ],
        },
      },
      {
        type: 'Feature',
        id: 'SVN',
        properties: {
          name: 'Slovenia',
        },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [13.806475, 46.509306],
              [14.632472, 46.431817],
              [15.137092, 46.658703],
              [16.011664, 46.683611],
              [16.202298, 46.852386],
              [16.370505, 46.841327],
              [16.564808, 46.503751],
              [15.768733, 46.238108],
              [15.67153, 45.834154],
              [15.323954, 45.731783],
              [15.327675, 45.452316],
              [14.935244, 45.471695],
              [14.595109, 45.634941],
              [14.411968, 45.466166],
              [13.71506, 45.500324],
              [13.93763, 45.591016],
              [13.69811, 46.016778],
              [13.806475, 46.509306],
            ],
          ],
        },
      },
      {
        type: 'Feature',
        id: 'BIH',
        properties: {
          name: 'Bosnia and Herzegovina',
        },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [19.005486, 44.860234],
              [19.36803, 44.863],
              [19.11761, 44.42307],
              [19.59976, 44.03847],
              [19.454, 43.5681],
              [19.21852, 43.52384],
              [19.03165, 43.43253],
              [18.70648, 43.20011],
              [18.56, 42.65],
              [17.674922, 43.028563],
              [17.297373, 43.446341],
              [16.916156, 43.667722],
              [16.456443, 44.04124],
              [16.23966, 44.351143],
              [15.750026, 44.818712],
              [15.959367, 45.233777],
              [16.318157, 45.004127],
              [16.534939, 45.211608],
              [17.002146, 45.233777],
              [17.861783, 45.06774],
              [18.553214, 45.08159],
              [19.005486, 44.860234],
            ],
          ],
        },
      },
    ],
  };
}
