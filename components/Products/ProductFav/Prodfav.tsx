import { Card } from "@material-ui/core";
import Image from "next/image";
import { shimmer, toBase64 } from "../../ShimmerEffect/Shimmer";
const FavProd = ({ prod }: { prod: any }) => {
  return (
    <Card>
      <Image
        src={prod.ImageOfProduct}
        width={100}
        height={100}
        quality={40}
        alt={`image of `}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(100, 60))}`}
        objectFit="cover"
        layout="responsive"
      />
    </Card>
  );
};

export default FavProd;
