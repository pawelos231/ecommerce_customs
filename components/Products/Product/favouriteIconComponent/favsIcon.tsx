import { CardActions, IconButton } from "@material-ui/core";
import { FavoriteBorder, Favorite } from "@material-ui/icons";
import { useState } from "react";
import useStyles from "../style.js";
import { useEffect } from "react";

const FavsIcon = ({ session, product }) => {
  const [favourite, setFavourite] = useState(false);
  const [fetchedProdcs, fetchHandle] = useState<any>([]);
  const classes = useStyles();
  const AddToFavouriteProductHandler = async () => {
    //id uzytkonika, zdjęcie produktu, id produktu
    if (session) {
      let unique: string = product.id + session.user.id;
      if (!favourite) {
        let DataObjectUserFavourite = {
          UserId: session.user.id,
          Unique: unique,
          ProductIdentity: product.id,
          ImageOfProduct: product.image.url,
        };
        setFavourite(true);
        await fetch("/api/favourite/addTofav", {
          method: "POST",
          body: JSON.stringify(DataObjectUserFavourite),
        });
      } else {
        setFavourite(false);
        await fetch(`/api/favourite/${unique}`, {
          method: "DELETE",
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => console.log(data));
      }
    }
  };
  useEffect(() => {
    const fetchAllProdcs = async () => {
      await fetch(`/api/favourite/userDataFetch/${session?.user?.id}`)
        .then((response) => response.json())
        .then((data) => {
          fetchHandle(data);
          console.log(fetchedProdcs.prodcs);
        });
    };
    fetchAllProdcs();
  }, []);
  useEffect(() => {
    if (fetchedProdcs.prodcs) {
      fetchedProdcs?.prodcs?.map((item) => {
        if (item.ProductIdentity == product.id) {
          setFavourite(true);
        }
      });
    }
  }, [fetchedProdcs]);
  if (fetchedProdcs?.prodcs?.length == 0) {
    <div>chuj</div>;
  }
  return (
    <div>
      <CardActions>
        <IconButton
          className={
            favourite ? classes.favouriteIcon : classes.favouriteIconBlack
          }
          onClick={AddToFavouriteProductHandler}
        >
          {!favourite ? <FavoriteBorder /> : <Favorite />}
        </IconButton>
      </CardActions>
    </div>
  );
};

export default FavsIcon;
