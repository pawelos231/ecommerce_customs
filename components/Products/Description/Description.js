import React, { useState } from "react";
import styles from "../../../styles/productPage.module.sass";
import Image from "next/image";
import Link from "next/link";
import { shimmer, toBase64 } from "../../ShimmerEffect/Shimmer";
import Comments from "./CommentsSection/Comments";
import { useSelector } from "react-redux";
const Description = ({ prodcs }) => {
  const productId = prodcs.id;
  console.log(productId);
  const Language = useSelector((state) => {
    return state.SwitchLan.language;
  });
  console.log(Language);
  return (
    <>
      <div className={styles.containerForDes}>
        {Language == "pl" ? (
          <h3>Opis produktu</h3>
        ) : (
          <h3>Product description</h3>
        )}
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic magnam
          consequuntur doloremque, rem quia commodi dignissimos porro est natus
          tenetur repellendus recusandae explicabo atque eligendi soluta ab
          dicta quaerat iure. Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Itaque a repudiandae id facilis. Hic similique
          voluptate ullam minima eligendi delectus saepe? Quae dolorum dolor aut
          ducimus explicabo fugiat ad enim.
        </p>
      </div>
      <div className={styles.conForrelated}>
        <div></div>
        {Language == "pl" ? (
          <h3 className={styles.related_products}> Powiązane produkty</h3>
        ) : (
          <h3 className={styles.related_products}> Related Products</h3>
        )}
      </div>
      <div className={styles.LookAlsoFor}>
        {prodcs.related_products.length != 0 ? (
          prodcs.related_products.map((item) => (
            <div>
              <Link href={`/prodcs/${item.id}`}>
                <Image
                  src={item.image.url}
                  width={20}
                  height={26}
                  quality={20}
                  objectFit="cover"
                  placeholder="blur"
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(
                    shimmer(180, 180)
                  )}`}
                  layout="responsive"
                ></Image>
              </Link>
            </div>
          ))
        ) : (
          <div>Nic tu nie ma :c</div>
        )}
      </div>
      <Comments productId={productId} Language={Language} />
    </>
  );
};

export default Description;
