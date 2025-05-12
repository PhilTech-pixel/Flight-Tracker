import { useState } from "react";
//Gets flights by Aircraft from Previous day or earlier
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

  const DisplayData = data.map((flightdata) => {
    return (
      <tr>
        <td>{flightdata.firstSeen}</td>
        <td>{flightdata.estDepartureAirport}</td>
        <td>{flightdata.lastSeen}</td>
        <td>{flightdata.estArrivalAirport}</td>
        <td>{flightdata.callsign}</td>
      </tr>
    );
  });

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
      <img
        src="https://www.opensky-network.org/img/logo.png"
        alt="Open Sky Network"
      />

      <div className="icao24-data">
        <table>
          <thead>
            <tr>
              <th>First Seen</th>
              <th>Depatured Airport</th>
              <th>Last Seen</th>
              <th>Arrival Airport</th>
              <th>CallSign</th>
            </tr>
          </thead>
          <tbody>{DisplayData}</tbody>
        </table>
      </div>
    </div>
  );

  // Render the data in the map (maybe in a sidebar)
}

export default Icao24;
