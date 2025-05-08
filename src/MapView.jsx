import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

const MapView = () => {
  const mapContainerRef = useRef();
  const mapRef = useRef();

  useEffect(() => {
    // TO MAKE THE MAP APPEAR YOU MUST
    // ADD YOUR ACCESS TOKEN FROM
    // https://account.mapbox.com
    mapboxgl.accessToken =
      "pk.eyJ1IjoicHdubGFiIiwiYSI6ImNtYWUzaXV4NTAzZDQya3Nnendqc3lyZTYifQ.X7ux09Uxtzp7h5dhQGrEUA";

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v10",
      projection: "globe",
      zoom: 2,
      center: [108, 4],
    });

    mapRef.current.on("style.load", () => {
      mapRef.current.setFog({});
    });

    mapRef.current.on("load", () => {
      mapRef.current.addSource("earthquakes", {
        type: "geojson",
        data: "https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson",
      });

      mapRef.current.addLayer({
        id: "earthquakes-layer",
        type: "circle",
        source: "earthquakes",
        paint: {
          "circle-radius": 4,
          "circle-stroke-width": 2,
          "circle-color": "red",
          "circle-stroke-color": "white",
        },
      });
    });

    return () => mapRef.current.remove();
  }, []);

  return <div ref={mapContainerRef} id="map" style={{ height: "100%" }}></div>;
};

export default MapView;
