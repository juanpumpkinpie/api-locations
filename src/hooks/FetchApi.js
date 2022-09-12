import { useEffect, useState } from "react";
import axios from "axios";

const FetchApi = () => {
  const [count, setCount] = useState(null);

  const options = {
    method: "GET",
    url: `https://api.ipgeolocation.io/ipgeo?apiKey=${
      import.meta.env.VITE_KEY_API_LOCATION
    }`,
  };

  useEffect(() => {
    const controller = new AbortController();

    const dataApi = async () => {
      try {
        const response = await axios.request(options, {
          signal: controller.signal,
        });
        setCount(response.data);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    };

    dataApi();

    return () => {
      controller.abort();
    };
  }, []);

  return { count };
};

export default FetchApi;
