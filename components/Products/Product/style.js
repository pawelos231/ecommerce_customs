import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  root: {
    // maxWidth: 345, original width style
    maxWidth: "100%",
    cursor: "pointer",
    minHeight: "60vh",
    position: "relative",
    backgroundColor: "white",
  },
  darkRoot: {
    maxWidth: "100%",
    cursor: "pointer",
    minHeight: "60vh",
    position: "relative",
    backgroundColor: "#252525",
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
    position: "absolute",
    bottom: "2%",
  },
  buttonShopDark: {
    color: "#ccc",
    position: "absolute",
    bottom: "2%",
  },
  favouriteIcon: {
    position: "absolute",
    bottom: "2%",
    right: "5%",
    color: "#FE3E86",
  },
  favouriteIconBlack: {
    position: "absolute",
    bottom: "2%",
    right: "5%",
    color: "gray",
  },
}));
