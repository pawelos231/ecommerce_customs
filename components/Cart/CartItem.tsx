import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
} from "@material-ui/core";
import useStyles from "./styles";
import React from "react";
import Image from "next/image";

const CartItem = ({ lineItem }: any) => {
  if (lineItem.image == null) {
    return <></>;
  }
  const classes = useStyles();
  return (
    <Card>
      <Image
        src={lineItem.image.url}
        alt={lineItem.name}
        width={300}
        height={200}
        quality={5}
        objectFit="cover"
        layout="responsive"
      />
      <CardContent className={classes.cardContent}>
        <p className={classes.InfoForProdName}>{lineItem.name}</p>
        <p className={classes.InfoForProdPrice}>
          {lineItem.price.formatted_with_symbol}
        </p>
        <CardActions className={classes.cartActions}>
          <div className={classes.buttons}>
            <Button type="button" size="small">
              {" "}
              -
            </Button>
            <Typography>{lineItem.quantity}</Typography>
            <Button type="button" size="small">
              {" "}
              +
            </Button>
          </div>
          <Button variant="contained" type="button" color="secondary">
            Remove
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default CartItem;
