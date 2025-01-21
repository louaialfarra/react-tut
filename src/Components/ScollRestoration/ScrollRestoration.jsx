import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const useScrollRestoration = () => {
  const location = useLocation();
  const [savedPositions, setSavedPositions] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      setSavedPositions((prevPositions) => ({
        ...prevPositions,
        [location.pathname]: window.scrollY,
      }));
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (savedPositions[location.pathname] !== undefined) {
      window.scrollTo(0, savedPositions[location.pathname]);
    }
  }, [location.pathname, savedPositions]);

  return null;
};

export default useScrollRestoration;
