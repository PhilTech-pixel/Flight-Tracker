import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const INITIAL_CENTER = [-74.0242, 40.6941]; // New York
const INITIAL_ZOOM = 2.5;

function MapView() {
  const mapRef = useRef();
  const mapContainerRef = useRef();
  const [center, setCenter] = useState(INITIAL_CENTER);
  const [zoom, setZoom] = useState(INITIAL_ZOOM);

  const icons = {
    grounded: "/grounded.png",
    takeoff: "/takeoff.png",
    landing: "/landing.png",
    cruising: "/airplane.png",
  };

  const preloadIcons = () => {
    Object.entries(icons).forEach(([status, url]) => {
      if (!mapRef.current.hasImage(status)) {
        mapRef.current.loadImage(url, (error, image) => {
          if (error || !image) {
            console.error(`Failed to load ${status} icon:`, error);
            return;
          }
          mapRef.current.addImage(status, image);
        });
      }
    });
  };

  const fetchFlightData = async () => {
    try {
      const response = await fetch(
        "https://opensky-network.org/api/states/all"
      );
      const data = await response.json();
      console.log(data);
      if (!data.states) return;

      const geojson = {
        type: "FeatureCollection",
        features: data.states
          .filter((state) => state[5] !== null && state[6] !== null)
          .map((state) => {
            const verticalRate = state[11];
            const onGround = state[8];
            let status;

            if (onGround) status = "grounded";
            else if (verticalRate > 3) status = "takeoff";
            else if (verticalRate < -3) status = "landing";
            else status = "cruising";

            return {
              type: "Feature",
              properties: {
                callsign: state[1],
                description: state[0],
                origin_country: state[2],
                velocity: state[9],
                vertical_rate: verticalRate,
                true_track: state[10],
                on_ground: onGround,
                flight_status: status,
              },
              geometry: {
                type: "Point",
                coordinates: [state[5], state[6]],
              },
            };
          }),
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
          type: "symbol",
          source: "flights",
          layout: {
            "icon-image": ["get", "flight_status"], // dynamic icon
            "icon-size": 0.5,
            "icon-rotate": ["get", "true_track"],
            "icon-allow-overlap": false,
          },
        });
        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
        });
        mapRef.current.on("mouseenter", "flights-layer", (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const description = e.features[0].properties.description;
          const callsign = e.features[0].properties.callsign;

          popup
            .setLngLat(coordinates)
            .setHTML(
              `<strong>${callsign}</strong><br><b>ICAO24</b>:${description}<br>Velocity: ${e.features[0].properties.velocity} m/s`
            )
            .addTo(mapRef.current);
        });
        mapRef.current.on("mouseleave", "flights-layer", () => {
          popup.remove();
        });
        mapRef.current.on("click", "flights-layer", (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const description = e.features[0].properties.description;
          const callsign = e.features[0].properties.callsign;

          new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(
              `<strong>${callsign}</strong><br>${description}<br>Velocity: ${e.features[0].properties.velocity} m/s`
            )
            .addTo(mapRef.current);
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
      minZoom: 2,
      maxZoom: 20,
    });

    mapRef.current = map;

    map.on("move", () => {
      const mapCenter = map.getCenter();
      const mapZoom = map.getZoom();
      setCenter([mapCenter.lng, mapCenter.lat]);
      setZoom(mapZoom);
    });

    map.on("load", () => {
      preloadIcons(); // load airplane icons
      fetchFlightData(); // Initial load
      const interval = setInterval(fetchFlightData, 30000); // every 30s

      // Clean up
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

export default MapView;
