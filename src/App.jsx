import { useEffect, useState, useRef } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import FetchApi from "./hooks/FetchApi";
import axios from "axios";
import SearchMap from "./components/SearchMap";
import ErrorBoundary from "./ErrorBoundary";
import { validIp } from "./helpers/RegExp";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CachedIcon from "@mui/icons-material/Cached";

function App() {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState("");
  const [valid, setValid] = useState(false);
  const [api, setApi] = useState("");
  const [list, setList] = useState([]);
  const [mapi, setMapi] = useState({});
  const { count } = FetchApi();
  const inputRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    validIp.test(api) ? setValid(true) : setValid(false);

    return () => {
      setValid(false);
      setError(null);
    };
  }, [api]);

  useEffect(() => {
    if (count !== null) {
      let mapa = tt.map({
        key: "8TDQwk6kFD0onsvogaVsI3GoVGeRC4lf",
        container: mapRef.current,
        center: [count.longitude, count.latitude],
        zoom: 10,
      });

      setMapi(mapa);
    }

    return () => {
      setIsCancelled(true);
    };
  }, [count]);

  useEffect(() => {
    if (list.length !== 0) {
      localStorage.setItem("list-location", JSON.stringify(list));
    }

    return () => {
      setIsCancelled(true);
    };
  }, [list]);

  const options = {
    method: "GET",
    url: `https://api.ipgeolocation.io/ipgeo?apiKey=c5d69a3525d64bf7ac9c0eb236612c6c&ip=${api}`,
  };

  const handleLocation = async (event) => {
    event.preventDefault();
    if (valid) {
      try {
        const response = await axios.request(options);
        setLocation(response.data);

        const item = inputRef.current.value;
        setList([item, ...list]);
      } catch (error) {
        setError(error);
        setLocation("");
        setIsCancelled(false);
      }
    }

    if (!valid) {
      setError("Invalid IP address");
    }
  };

  return (
    <ErrorBoundary>
      <div className=" text-md font-bold  p-7 bg-gray-200 ">
        <div className=" grid grid-cols-3 grid-rows-3 gap-2 ">
          <div className=" bg-white rounded-md p-3 row-span-3 ">
            List of all searches{" "}
            {count !== null && (
              <>
                <ul>
                  {list.map((item) => (
                    <li key={item} className="p-2">
                      <LocationOnIcon color="secondary" /> {item}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <div>
            <div ref={mapRef} className=" max-h-60"></div>
          </div>
          <div className=" bg-indigo-600/10 rounded-md p-3">
            <h2>Current user location:</h2>

            {count !== null && (
              <ul>
                <li>IP: {count.ip}</li>
                <li>City: {count.city}</li>
                <li>Country: {count.continent_name}</li>
                <li>Zipcode: {count.zipcode}</li>
              </ul>
            )}
          </div>
          <div className="col-span-2">
            <form method="POST" onSubmit={handleLocation}>
              <input
                type="text"
                ref={inputRef}
                placeholder="Search location by IPv4: 5.44.31.255"
                className=" border-none p-2 w-[70%] rounded-md"
                onChange={({ target }) => setApi(target.value)}
              />

              <button
                type="submit"
                className=" bg-green-500 text-yellow-50 p-2 rounded-sm ml-5 w-[20%] mt-5"
              >
                SEARCH
              </button>
            </form>
            {error !== null && (
              <p className=" text-red-400 mt-4">
                <ErrorOutlineIcon /> {error}
              </p>
            )}
          </div>

          <div>
            {location !== "" ? (
              <SearchMap location={location} />
            ) : (
              <span className=" text-gray-400">
                <CachedIcon />
              </span>
            )}
          </div>
          <div className="rounded-md p-3">
            <h2> Information about last search:</h2>

            {location !== "" ? (
              <ul>
                <li>
                  IP: <span className=" text-green-500">{location.ip}</span>
                </li>
                <li>
                  City:<span className=" text-green-500"> {location.city}</span>
                </li>
                <li>
                  Country:
                  <span className=" text-green-500">
                    {location.continent_name}
                  </span>
                </li>
                <li>
                  Zipcode:
                  <span className=" text-green-500">{location.zipcode}</span>
                </li>
              </ul>
            ) : (
              <span className=" text-gray-400">
                Not previews research found
              </span>
            )}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
