import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const FullScreenLoader = () => {
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        positionArea: "center",
        background: "radial-gradient(circle, black, transparent)",
        zIndex: "5",
      }}
    >
      <Box sx={{ display: "flex", placeContent: "center" }}>
        <CircularProgress size={160} sx={{ color: "#e96dff" }} />
      </Box>
    </div>
  );
};
export default FullScreenLoader;
/**align-items: anchor-center;
    justify-content: center;
    display: flex
;
    position: absolute;
    place-self: anchor-center;
    width: 100%;
    height: 100%;   background: #111111; 
    zinderx 555*/
/* padding: 26vw; */
