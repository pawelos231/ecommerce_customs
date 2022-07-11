import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export default makeStyles(() => createStyles ({
  media: {
    height: 260,
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "25vh",
    fontSize: "12px",
  },
  cartActions: {
    justifyContent: "space-between",
  },
  buttons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  InfoForProdName: {
    fontSize: "20px",
    margin: "0px",
  },
  InfoForProdPrice: {
    fontSize: "15px",
    margin: "0px",
  },
}));
