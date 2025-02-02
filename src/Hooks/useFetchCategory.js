import { useEffect } from "react";
import axios from "axios";

const useFetchCategory = (
  WOO_URL,
  CONSUMER_KEY,
  CONSUMER_SECRET,
  setCategory
) => {
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${WOO_URL}/products/categories`, {
          params: {
            consumer_key: CONSUMER_KEY,
            consumer_secret: CONSUMER_SECRET,
            per_page: 100,
          },
        });

        const allCat = { name: "All", id: "all" };

        const updateCat = [allCat, ...response.data];

        setCategory(updateCat);
        localStorage.setItem("categories", JSON.stringify(updateCat));
        console.log("this is category" + response.data);
      } catch (e) {}
    };
    fetchCategories();
  }, []);
};

export default useFetchCategory;
