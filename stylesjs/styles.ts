import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) => createStyles  ({
  toolbar: theme.mixins.toolbar,
  title: {
    marginTop: "5%",
  },
  emptyButton: {
    minWidth: "150px",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "5px",
    },
    [theme.breakpoints.up("xs")]: {
      marginRight: "20px",
    },
  },
  checkoutButton: {
    minWidth: "150px",
  },
  link: {
    textDecoration: "none",
  },
  cardDetails: {
    display: "flex",
    marginTop: "10%",
    width: "100%",
    justifyContent: "space-between",
  },
  con: {
    marginTop: "7%",
    padding: "2rem",
  },
  containerForCards: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    width: "80vw",
  },
  conForCards: {
    flexBasis: "20%",
    width: "10%",
  },
  details:{
    
  }
}));
