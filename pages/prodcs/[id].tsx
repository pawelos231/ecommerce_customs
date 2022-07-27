import { commerce } from "../../lib/commerce";
import styles from "../../styles/productPage.module.sass";
import React from "react";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.css";
import Description from "../../components/Products/Description/Description";
import { useState } from "react";
import { shimmer, toBase64 } from "../../components/ShimmerEffect/Shimmer";
import { fetchCart } from "../../actions/fetchcommerceCart";
import { useEffect } from "react";
import Variants from "../../components/Products/Description/VariantsGroups/Variants";
import { useTheme } from "next-themes";
import HeadForProdcs from "../../components/Layouts/HeadForProdcs";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import { SetSized } from "../../interfaces/interfacesAboutUserDetails";
import useWindowSize from "../../hooks/useWindowResize";
import dynamic from "next/dynamic";
const DynamicNavbarForComputer = dynamic(
  () => import("../../components/Navbar/Navbar")
);
const DynamicNavbarForPhone = dynamic(
  () => import("../../components/NavbarForPhone/NavbarPhone")
);
const DynamicModalForPhotos = dynamic(
  () => import("../../components/Products/ModalPhotos/ModalForPhotos")
);
let index: number = 0;
export const getStaticPaths: GetStaticPaths = async () => {
  const { data }: { data: any } = await commerce.products.list();
  const paths: any = data.map((item: any) => {
    return {
      params: { id: item.id.toString() },
    };
  });

  return {
    paths,
    fallback: true,
  };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id: string | string[] = params.id;
  const { data }: { data: any } = await commerce.products.list({
    query: id,
  });
  if (!data.length) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { prodcs: data[0] },
    revalidate: 60, //later change to on demand revalidation via github actions or some custom server function
  };
};
const ProductDetails = ({ prodcs }) => {
  const [click, setClick] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const size: SetSized = useWindowSize();
  const setClickModal = (i: number) => {
    setClick(!click);
    index = i;
  };
  const { theme, setTheme } = useTheme();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCart());
    setMounted(true);
  }, []);
  let cart: number = useSelector((state: RootStateOrAny) => {
    return state.cartFetch.total_items;
  });
  //title, description, link, image
  if (!prodcs || !mounted) return <div>loading...</div>;
  return (
    <>
      <HeadForProdcs
        title={prodcs.name}
        description={prodcs.attributes[0].value}
        link={`ecommerce-basia.vercel.app/prodcs/${prodcs.id}`}
        image={prodcs.image.url}
      />
      {size.width > 720 ? (
        <DynamicNavbarForComputer
          totaltems={null}
          data={null}
          categories={null}
        />
      ) : (
        <DynamicNavbarForPhone />
      )}
      <div className={styles.mainContainer} data-ison={theme}>
        <div className={styles.containerForContent}>
          <div>
            {click === true ? (
              <DynamicModalForPhotos
                setClickModal={setClickModal}
                itemId={index}
                prodcs={prodcs}
              />
            ) : null}
            <Carousel
              swipeable
              infiniteLoop
              emulateTouch
              showIndicators={false}
              showThumbs={false}
              showStatus={false}
              autoPlay
            >
              {prodcs.assets.map((item, i) => {
                return (
                  <>
                    <div
                      key={item.url}
                      className={styles.ImageCon}
                      onClick={() => setClickModal(i)}
                    >
                      <Image
                        src={item.url}
                        width={400}
                        height={300}
                        alt={`${i} image of ${prodcs.name}`}
                        placeholder="blur"
                        blurDataURL={`data:image/svg+xml;base64,${toBase64(
                          shimmer(400, 300)
                        )}`}
                        objectFit="cover"
                        layout="responsive"
                        quality={30}
                      />
                    </div>
                  </>
                );
              })}
            </Carousel>
          </div>
          <article>
            <h2>{prodcs.name}</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
              tempore exercitationem expedita dignissimos earum minima amet, eum
              itaque nesciunt, suscipit quaerat cupiditate quia sit voluptatibus
              accusamus laborum aperiam. Nemo, facere.
            </p>
            <Variants prodcs={prodcs} />
          </article>
        </div>
        <div className={styles.comments}>
          <Description prodcs={prodcs} />
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
