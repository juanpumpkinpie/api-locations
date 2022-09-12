import { useEffect, useState, useRef } from "react";
import tt from "@tomtom-international/web-sdk-maps";

const SearchMap = ({ location }) => {
  const [mapi, setMapi] = useState({});
  const mapRefTwo = useRef(null);

  useEffect(() => {
    let mapa = tt.map({
      key: import.meta.env.VITE_MAP_KEY,
      container: mapRefTwo.current,
      center: [location.longitude, location.latitude],
      zoom: 10,
    });

    setMapi(mapa);
  }, [location]);

  return (
    <div>
      <div ref={mapRefTwo} className="max-h-60"></div>
    </div>
  );
};

export default SearchMap;
