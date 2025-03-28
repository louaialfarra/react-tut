import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PeopleIcon from "@mui/icons-material/People";
import Dropdown from "../Dropdown/Dropdown";
import { useState, useEffect } from "react";

import MenuIcon from "@mui/icons-material/Menu";

import { useNavigate, Link } from "react-router-dom";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

export default function BurgerMenu() {
  const [state, setState] = React.useState({
    left: false,
  });
  const [storedCategory, setStoredCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCategories = localStorage.getItem("categories");
    if (savedCategories) {
      setStoredCategory(JSON.parse(savedCategories));
    }
  }, []);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleNavigation = (path) => {
    navigate(path);
    setState({ ...state, left: false }); // Close the drawer
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[
          { text: "Home", path: "/", icon: <HomeIcon /> },
          {
            text: "Categories",
            path: "/shopcategory/all",
            icon: <CategoryIcon />,
          },
          { text: "About Us", path: "/about", icon: <PeopleIcon /> },
          { text: "Contact", path: "/contact", icon: <WhatsAppIcon /> },
          { text: "Sale", path: "/saleproducts", icon: <LocalOfferIcon /> },
        ].map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => handleNavigation(item.path)}>
              <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}

        {/*
        edit by me to dispaly the list categorys no need
        <ListItem disablePadding>
          <ListItemButton onClick={(event) => event.stopPropagation()}>
            <ListItemIcon></ListItemIcon>
            <Dropdown
              subcat={storedCategory.filter(
                (cat) => cat.parent === 0 && cat.name !== "Uncategorized"
              )}
              allCategory={storedCategory}
            />
          </ListItemButton>
        </ListItem>*/}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <MenuIcon sx={{ fontSize: "x-large", color: "white" }} />
          </Button>
          <Drawer
            sx={{
              "& .MuiDrawer-paper": {
                backgroundColor: "#242424",
                width: 250,
                color: "white",
              },
            }}
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
