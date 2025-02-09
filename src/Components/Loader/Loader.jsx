import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loader = () => {
  return (
    <Box sx={{ display: "flex", placeContent: "center" }}>
      <CircularProgress size={60} sx={{ color: "#e96dff" }} />
    </Box>
  );
};
export default Loader;
