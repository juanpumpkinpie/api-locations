import { useEffect, useState } from "react";
import FetchApi from "./hooks/FetchApi";

function App() {
  const [isCancelled, setIsCancelled] = useState(false);
  const { count } = FetchApi();

  useEffect(() => {
    if (isCancelled) {
      console.log("count", count);
      console.log("rendering again");
    }
    return () => {
      setIsCancelled(true);
    };
  }, [count]);

  return (
    <div className=" text-md font-bold underline p-7 bg-gray-200 ">
      <h2>Dashboard</h2>
      <div className=" grid grid-cols-6 grid-rows-6 gap-3 bg-purple-600/10">
        <div className=" border-solid	border-2 border-indigo-600 row-span-6 col-span-2">
          List of all searches {count !== null && <p>{count.query}</p>}
        </div>
        <div className=" border-solid	border-2 border-indigo-600  col-span-2">
          Map with user location
        </div>
        <div className=" border-solid	border-2 border-indigo-600  col-span-2">
          information about user location:
          {count !== null && (
            <ul>
              <li>IP: {count.query}</li>
              <li>Country: {count.country}</li>
              <li>City: {count.city}</li>
              <li>Region: {count.regionName}</li>
              <li>
                lon: {count.lon}- lat: {count.lat}
              </li>
            </ul>
          )}
        </div>
        <div className=" border-solid	border-2 border-indigo-600  col-span-3">
          search box
        </div>
        <div className=" border-solid	border-2 border-indigo-600">search</div>
        <div className=" border-solid	border-2 border-indigo-600  col-span-2">
          Map with last search location
        </div>
        <div className=" border-solid	border-2 border-indigo-600  col-span-2">
          Information about last search
        </div>
      </div>
    </div>
  );
}

export default App;
