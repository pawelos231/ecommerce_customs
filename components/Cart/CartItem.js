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

const CartItem = ({ lineItem }) => {
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
      <CardContent className={classes.CardContent}>
        <Typography variant="h5">{lineItem.name}</Typography>
        <Typography variant="h6">
          {lineItem.price.formatted_with_symbol}
        </Typography>
        <CardActions className={classes.cardActions}>
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
