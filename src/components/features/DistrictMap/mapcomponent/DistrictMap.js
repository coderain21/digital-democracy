import React, { useRef, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import data from "./tl_2022_us_cd116_processed_simplified.json";
import statelower from "./merged_2022_sldl_processed_simplified.json";
import stateupper from "./merged_2022_sldu_processed_simplified.json";

//The following line prevents issues in production
// eslint-disable-next-line import/no-webpack-loader-syntax
// mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

function DistrictMap({locationString = "None"}) {
    // API key is exposed, needs to be fixed
    mapboxgl.accessToken = "pk.eyJ1IjoiZGR0ZWFtIiwiYSI6ImNsYWE4Ymp2MTAzZGQzb2xweXhvYTF5bnMifQ.plCD33azG7GB4SM1xIwjXw";
    
    const mapContainer = useRef(null);

    const [map, setMap] = useState(null);
    
    const [lng, setLng] = useState(-98.6);
    const [lat, setLat] = useState(39.8);
    const [zoom, setZoom] = useState(3);



    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });

        map.on('load', () => {

            
            // Add source and layer for US congressional districts
            map.addSource('districts', {
                type: 'geojson',
                data
            });

            map.addLayer(
                {
                id: 'districts-outline',
                type: 'line',
                source: 'districts',
                paint: {
                    'line-color': '#0000ff',
                    'line-width': 3
                    }
                }
            );

            map.addLayer(
                {
                id: 'districts-label',
                type: 'symbol',
                source: 'districts',
                layout: {
                    'text-field': ['concat', ['get', 'STATEFP'], '-', ['get', 'CD116FP']]
                }
                }
            );

            // add source layer for state legislative districts lower
            map.addSource('statelower', {
                type: 'geojson',
                data: statelower
            });

            map.addLayer(
                {
                id: 'statelower-outline',
                type: 'line',
                source: 'statelower',
                paint: {
                    'line-color': '#ff0000',
                    'line-width': 3
                    }
                }
            );

            map.addLayer(
                {
                id: 'statelower-label',
                type: 'symbol',
                source: 'statelower',
                layout: {
                    'text-field': ['concat', ['get', 'STATEFP'], '-', ['get', 'SLDLST']]
                }
                }
            );

            // add source layer for state legislative districts upper
            map.addSource('stateupper', {
                type: 'geojson',
                data: stateupper
            });

            map.addLayer(
                {
                id: 'stateupper-outline',
                type: 'line',
                source: 'stateupper',
                paint: {
                    'line-color': '#00ff00',
                    'line-width': 3
                    }
                }
            );

            map.addLayer(
                {
                id: 'stateupper-label',
                type: 'symbol',
                source: 'stateupper',
                layout: {
                    'text-field': ['concat', ['get', 'STATEFP'], '-', ['get', 'SLDUST']]
                }
                }
            );

            // set default layer visibility to U.S. congress
            map.setLayoutProperty("districts-outline", "visibility", "visible");
            map.setLayoutProperty("districts-label", "visibility", "visible");
            map.setLayoutProperty("statelower-outline", "visibility", "none");
            map.setLayoutProperty("statelower-label", "visibility", "none");
            map.setLayoutProperty("stateupper-outline", "visibility", "none");
            map.setLayoutProperty("stateupper-label", "visibility", "none");

            
            if (locationString != "None") {
                const location = locationString;
                fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${mapboxgl.accessToken}`)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data.features[0]);
                        setLng(data.features[0].center[0]);
                        setLat(data.features[0].center[1]);
                        map.flyTo({
                            center: data.features[0].center,
                            zoom: 9
                            });
                        const marker = new mapboxgl.Marker()
                            .setLngLat(data.features[0].center)
                            .addTo(map);
                    });
            }

            setMap(map);
        
        });

        map.addControl(new mapboxgl.NavigationControl(), 'top-right');

        
        map.addControl(
            new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
            })
            );

        map.on('move', () => {
            setLng(map.getCenter().lng.toFixed(4));
            setLat(map.getCenter().lat.toFixed(4));
            setZoom(map.getZoom().toFixed(2));
          });

        return () => map.remove();
        
    }, []);

    const handleClick = e => {
        if (map){
            // hide all layers
            map.setLayoutProperty("districts-outline", "visibility", "none");
            map.setLayoutProperty("districts-label", "visibility", "none");
            map.setLayoutProperty("statelower-outline", "visibility", "none");
            map.setLayoutProperty("statelower-label", "visibility", "none");
            map.setLayoutProperty("stateupper-outline", "visibility", "none");
            map.setLayoutProperty("stateupper-label", "visibility", "none");
            // show clicked layer
            if (e.target.textContent == "U.S. Congress"){
                map.setLayoutProperty("districts-outline", "visibility", "visible");
                map.setLayoutProperty("districts-label", "visibility", "visible");
            };
            if (e.target.textContent == "State House"){
                map.setLayoutProperty("statelower-outline", "visibility", "visible");
                map.setLayoutProperty("statelower-label", "visibility", "visible");
            };
            if (e.target.textContent == "State Senate"){
                map.setLayoutProperty("stateupper-outline", "visibility", "visible");
                map.setLayoutProperty("stateupper-label", "visibility", "visible");
            };
            setMap(map);
        };
        e.preventDefault();
    };



    return (
        <div className="mt-3" style={{textAlign: 'center'}}>
            <h3>District Map</h3>
            <div className="sidebar">
                | Longitude: {lng} | Latitude: {lat} | Zoom: {zoom} |
            </div>
            <div ref={mapContainer} className="map-container" style={{height: "400px", border: "solid black 1px" }}/>
            <button className="btn-1" type="button" onClick={handleClick}>U.S. Congress</button>
            <button className="btn-2" type="button" onClick={handleClick}>State House</button>
            <button className="btn-3" type="button" onClick={handleClick}>State Senate</button>
        </div>
     );
}

export default DistrictMap;
