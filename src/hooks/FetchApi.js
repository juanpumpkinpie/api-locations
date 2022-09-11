import { useEffect, useState } from "react";
import axios from "axios";

const FetchApi = () => {
  const [count, setCount] = useState(null);

  const options = {
    method: "GET",
    url: "https://api.ipgeolocation.io/ipgeo?apiKey=c5d69a3525d64bf7ac9c0eb236612c6c",
  };

  useEffect(() => {
    const controller = new AbortController();

    const dataApi = async () => {
      try {
        const response = await axios.request(options, {
          signal: controller.signal,
        });
        setCount(response.data);
        console.log("from apiCall", response.data);
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
