import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css";

const INITIAL_CENTER = [-74.0242, 40.6941]; // New York
const INITIAL_ZOOM = 2.5;

function App() {
  const mapRef = useRef();
  const mapContainerRef = useRef();

  const [center, setCenter] = useState(INITIAL_CENTER);
  const [zoom, setZoom] = useState(INITIAL_ZOOM);

  // Fetch and update flight data as GeoJSON
  const fetchFlightData = async () => {
    //const username = "Lip";
    //const password = "CzPrAUpVT78W!A!";
    try {
      const response = await fetch(
        "https://opensky-network.org/api/states/all"
      );

      const data = await response.json();

      if (!data.states) return;

      const geojson = {
        type: "FeatureCollection",
        features: data.states
          .filter((state) => state[5] !== null && state[6] !== null)
          .map((state) => ({
            type: "Feature",
            properties: {
              callsign: state[1],
              origin_country: state[2],
              velocity: state[9],
              vertical_rate: state[11],
              on_ground: state[8],
            },
            geometry: {
              type: "Point",
              coordinates: [state[5], state[6]],
            },
          })),
      };

      if (mapRef.current.getSource("flights")) {
        mapRef.current.getSource("flights").setData(geojson);
      } else {
        mapRef.current.addSource("flights", {
          type: "geojson",
          data: geojson,
        });

        mapRef.current.addLayer({
          id: "flights-layer",
          type: "circle",
          source: "flights",
          paint: {
            "circle-radius": 4,
            "circle-stroke-width": 1,
            "circle-color": "#00ffff",
            "circle-stroke-color": "#000000",
          },
        });
      }
    } catch (error) {
      console.error("Failed to fetch flight data:", error);
    }
  };

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoicHdubGFiIiwiYSI6ImNtYWUzaXV4NTAzZDQya3Nnendqc3lyZTYifQ.X7ux09Uxtzp7h5dhQGrEUA";

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: center,
      zoom: zoom,
      style: "mapbox://styles/mapbox/dark-v10",
    });

    mapRef.current = map;

    map.on("move", () => {
      const mapCenter = map.getCenter();
      const mapZoom = map.getZoom();
      setCenter([mapCenter.lng, mapCenter.lat]);
      setZoom(mapZoom);
    });

    map.on("load", () => {
      fetchFlightData(); // Initial load
      const interval = setInterval(fetchFlightData, 30000); // every 30s

      // Clean up interval when component unmounts
      return () => clearInterval(interval);
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <>
      <div className="sidebar">
        <h2>Flight Tracker App</h2>
        Longitude: {center[0].toFixed(4)} | Latitude: {center[1].toFixed(4)} |
        Zoom: {zoom.toFixed(1)}
      </div>
      <div id="map-container" ref={mapContainerRef} />
    </>
  );
}

export default App
