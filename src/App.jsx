import { useEffect, useState, useRef } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import FetchApi from "./hooks/FetchApi";
import axios from "axios";

function App() {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState("");
  const [list, setList] = useState([]);
  const [mapi, setMapi] = useState({});
  const { count } = FetchApi();
  const inputRef = useRef(null);
  const mapRef = useRef(null);

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

    // const ll = new tt.LngLat(-73.9749, 40.7736);
  }, [count]);

  useEffect(() => {
    if (isCancelled) {
      console.log("count", count);
      console.log("rendering again");
    }
    return () => {
      setIsCancelled(true);
    };
  }, [count]);

  useEffect(() => {
    if (list.length !== 0) {
      console.log("list", list);
      localStorage.setItem("list-location", JSON.stringify(list));
    }

    return () => {
      setIsCancelled(true);
    };
  }, [list]);

  const options = {
    method: "GET",
    url: `https://api.ipgeolocation.io/ipgeo?apiKey=c5d69a3525d64bf7ac9c0eb236612c6c&ip=${location}`,
  };

  const handleLocation = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.request(options);
      setLocation(response.data);
      console.log("Location-input data:", response.data);
      const item = inputRef.current.value;
      setList([item, ...list]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" text-md font-bold  p-7 bg-gray-200 ">
      <div className=" grid grid-cols-3 grid-rows-3 gap-2 ">
        <div className=" border-solid	border-2 border-purple-600/10 row-span-3 ">
          List of all searches{" "}
          {count !== null && (
            <>
              <ul>
                {list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className=" border-solid	border-2 border-indigo-600 h-60">
          <div ref={mapRef} className=" max-h-60"></div>
        </div>
        <div className=" border-solid	border-2 border-indigo-600">
          information about user location:
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
              placeholder="Search IP: 0.0.0.0"
              onChange={({ target }) => {
                setLocation(target.value);
              }}
              className=" border-none p-2 w-[70%]"
            />
            <button
              type="submit"
              className=" bg-green-500 text-yellow-50 p-2 rounded-sm ml-5 w-[20%] mt-5"
            >
              SEARCH
            </button>
          </form>
          <p className=" text-red-400">{error}</p>
        </div>

        <div className=" border-solid	border-2 border-indigo-600  ">
          Map with last search location
        </div>
        <div className=" border-solid	border-2 border-indigo-600  ">
          Information about last search:
          {location !== "" ? (
            <ul>
              <li>IP: {location.ip}</li>
              <li>City: {location.city}</li>
              <li>Country: {location.continent_name}</li>
              <li>Zipcode: {location.zipcode}</li>
            </ul>
          ) : (
            "Not previews research found"
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
