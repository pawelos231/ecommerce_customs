import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  root: {
    // maxWidth: 345, original width style
    maxWidth: "100%",
    cursor: "pointer",
    minHeight: "50vh",
    position: "relative",
    backgroundColor: "transparent",
  },
  darkRoot: {
    maxWidth: "100%",
    cursor: "pointer",
    minHeight: "50vh",
    position: "relative",
    backgroundColor: "transparent",
    boxShadow: "0 0 28px 5px rgba(black, 0.1 )",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
  },
  buttonShop: {
    color: "#ccc",
    transition: "0.3s",
    "&:hover": {
      transform: "scale(1.1)",
      color: "black",
    },
  },
  buttonShopDark: {
    color: "#ccc",
    transition: "0.3s",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  favouriteIcon: {
    color: "#FE3E86",
    transition: "0.3s",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  favouriteIconBlack: {
    color: "gray",
    transition: "0.3s",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
}));
