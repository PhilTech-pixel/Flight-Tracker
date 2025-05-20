import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Search() {
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
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">Search</Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="bg-gray-900/95 border border-white/20 shadow-lg text-white z-50 p-6 max-w-full w-auto"
        style={{ minWidth: "350px" }}
      >
        <SheetHeader>
          <SheetTitle className="font-bold text-white">Search Plane</SheetTitle>
          <SheetDescription classname="text-white">
            Insert ICAO Number
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="icao24" className="text-right ml-3">
              ICAO24
            </Label>
            <Input
              id="icao24"
              placeholder="ICAO24"
              onChange={(e) => setIcaoNo(e.target.value)}
            />
            <Button
              variant="ghost"
              className="col-span-2"
              onClick={fetchFlightData}
            >
              Search
            </Button>
          </div>
          <div className="grid grid-cols-4 items-center gap-4"></div>
        </div>
        <div className="icao24-data mt-6">
          <table className="min-w-full border border-gray-700 rounded-lg overflow-hidden bg-gray-900">
            <thead>
              <tr className="bg-gray-800 text-gray-200">
                <th className="px-4 py-2 border-b border-gray-700 text-left">
                  First Seen
                </th>
                <th className="px-4 py-2 border-b border-gray-700 text-left">
                  Departure Airport
                </th>
                <th className="px-4 py-2 border-b border-gray-700 text-left">
                  Last Seen
                </th>
                <th className="px-4 py-2 border-b border-gray-700 text-left">
                  Arrival Airport
                </th>
                <th className="px-4 py-2 border-b border-gray-700 text-left">
                  CallSign
                </th>
              </tr>
            </thead>
            <tbody>
              {DisplayData.length > 0 ? (
                DisplayData
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-4 text-center text-gray-400"
                  >
                    No data to display.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
