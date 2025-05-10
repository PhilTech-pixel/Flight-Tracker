import { useState } from "react";

function Icao24() {
  const [IcaoNo, setIcaoNo] = useState("");

  // User search Data using plane ICAO Number
  const [data, setData] = useState([]);

  const fetchFlightData = async () => {
    try {
      const response = await fetch(
        `https://opensky-network.org/api/flights/aircraft?icao24=${IcaoNo}&begin=1517184000&end=1517270400`
      );

      setData(await response.json());
      console.log(data); // Log the data or handle it as needed
    } catch (error) {
      console.error("Error fetching flight data:", error); // Handle errors
    }
  };
  const key = Math.floor(Math.random() * 1000);

  return (
    <div className="icao24">
      <h1>ICAO24</h1>
      <input
        name="icao"
        type="text"
        value={IcaoNo}
        onChange={(e) => setIcaoNo(e.target.value)}
        placeholder="Enter ICAO24 Number"
      />
      <button onClick={fetchFlightData}>Search</button>
      <div className="icao24-data">
        <ol>
          {data.map((flightdata) => {
            return <li>{flightdata.callsign}</li>;
          })}
        </ol>
      </div>
    </div>
  );

  // Render the data in the map (maybe in a sidebar)
}

export default Icao24;
