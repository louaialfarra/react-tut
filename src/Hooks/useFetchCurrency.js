import { useEffect } from "react";
import axios from "axios";

const useFetchCurrency = (
  CURRENCY,
  CONSUMER_KEY,
  CONSUMER_SECRET,
  setCurrency
) => {
  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const response = await axios.get(`${CURRENCY}`, {
          params: {
            consumer_key: CONSUMER_KEY,
            consumer_secret: CONSUMER_SECRET,
          },
        });
        const currencyData = response.data;
        setCurrency(currencyData.SYP.rate);
        localStorage.setItem("currency", JSON.stringify(currencyData.SYP.rate));
        console.log("this is curency" + currencyData.SYP.rate);
      } catch (e) {
        console.error(e);
      }
    };
    fetchCurrency();
  }, [CURRENCY, CONSUMER_KEY, CONSUMER_SECRET, setCurrency]);
};

export default useFetchCurrency;
