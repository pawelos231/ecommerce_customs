import { CardActions, IconButton } from "@material-ui/core";
import { FavoriteBorder, Favorite } from "@material-ui/icons";
import { useState } from "react";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { POST, DELETE } from "../../../../constants/FetchDataMethods";
import FavsInfo from "../../../../interfaces/interfaces";
import useStyles from "../style";
const FavsIcon = ({ session, product }) => {
  const [favourite, setFavourite] = useState<boolean>(false);
  const [fetchedProdcs, fetchHandle] = useState<FavsInfo>(null);
  const { theme, setTheme } = useTheme();
  const classes = useStyles();
  const AddToFavouriteProductHandler = async () => {
    //id uzytkonika, zdjęcie produktu, id produktu
    if (session) {
      let unique: string = product.id + session.user.id;
      if (!favourite) {
        let DataObjectUserFavourite: Object = {
          UserId: session.user.id,
          Unique: unique,
          ProductIdentity: product.id,
          ImageOfProduct: product.image.url,
        };
        setFavourite(true);
        await fetch("/api/favourite/addTofav", {
          method: POST,
          body: JSON.stringify(DataObjectUserFavourite),
        });
      } else {
        setFavourite(false);
        await fetch(`/api/favourite/${unique}`, {
          method: DELETE,
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
          console.log(data);
          fetchHandle(data.prodcs);
        });
    };
    fetchAllProdcs();
  }, []);
  useEffect(() => {
    //i know this is stupidly done on the client site, later i will have to change that to be done on the server
    if (fetchedProdcs) {
      fetchedProdcs?.map((item: any) => {
        if (item.ProductIdentity == product.id) {
          setFavourite(true);
        }
      });
    }
  }, [fetchedProdcs]);
  if (fetchedProdcs?.prodcs?.length == 0) {
    <div>Nic tu nie ma</div>;
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
          {!favourite ? (
            <FavoriteBorder
              className={
                theme === "dark"
                  ? classes.favouriteIconDark
                  : classes.favouriteIconWhite
              }
            />
          ) : (
            <Favorite />
          )}
        </IconButton>
      </CardActions>
    </div>
  );
};

export default FavsIcon;
