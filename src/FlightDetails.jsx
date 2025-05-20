import React from "react";

const FlightDetails = ({ flight }) => {
  if (!flight) {
    return (
      <div className="flight-detail-box">
        <div className="card-content text-gray-400 p-4">
          No flight selected.
        </div>
      </div>
    );
  }

  return (
    <div className="flight-detail-box">
      <div className="card-content">
        <div className="card-root">
          <div className="card-header flex-row justify-content-between">
            <div>
              <img src="/icon.png" alt="icon" className="icon" height={24} />
            </div>
            <div className="ml-58">{flight.icao24 || "ICAO24"}</div>
          </div>

          <div className="card-body flex-column">
            <div className="row">
              <div className="label">Last Contact</div>
              <div className="value">{flight.lastContact || "-"}</div>
            </div>
            <div className="row">
              <div className="label">Origin Country</div>
              <div className="value">{flight.origin_country || "-"}</div>
            </div>
            <div className="row">
              <div className="label">Velocity</div>
              <div className="value">{flight.velocity || "-"}</div>
            </div>
            <div className="row">
              <div className="label">Geometric Altitude</div>
              <div className="value">{flight.geo_altitude || "-"}</div>
            </div>
            <div className="row">
              <div className="label">Barometric Altitude</div>
              <div className="value">{flight.baro_altitude || "-"}</div>
            </div>
            <div className="row">
              <div className="label">Vertical Rate</div>
              <div className="value">{flight.vertical_rate || "-"}</div>
            </div>
            <div className="row">
              <div className="label">Squawk</div>
              <div className="value">{flight.squawk || "-"}</div>
            </div>
            <div className="row">
              <div className="label">ICAO24</div>
              <div className="value">{flight.icao24 || "-"}</div>
            </div>
            <div className="row">
              <div className="label">Position Source</div>
              <div className="value">{flight.position_source || "-"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightDetails;
