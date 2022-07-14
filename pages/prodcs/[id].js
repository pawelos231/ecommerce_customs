import { commerce } from "../../lib/commerce";
import styles from "../../styles/productPage.module.sass";
import Navbar from "../../components/Navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.css";
import Description from "../../components/Products/Description/Description";
import { useState } from "react";
import ModalForPhotos from "../../components/Products/ModalPhotos/ModalForPhotos.js";
import { shimmer, toBase64 } from "../../components/ShimmerEffect/Shimmer";
import { fetchCart } from "../../actions/fetchcommerceCart";
import { useEffect } from "react";
import Variants from "../../components/Products/Description/VariantsGroups/Variants";
import { useTheme } from "next-themes";
import HeadForProdcs from "../../components/Layouts/HeadForProdcs";
let index = 0;
export async function getStaticPaths() {
  const { data } = await commerce.products.list();
  const paths = data.map((item) => {
    return {
      params: { id: item.id.toString() },
    };
  });

  return {
    paths,
    fallback: true,
  };
}
export async function getStaticProps({ params }) {
  const id = params.id;
  const { data } = await commerce.products.list({
    query: id,
    limit: 5,
    page: 1,
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
    revalidate: 1,
  };
}
const ProductDetails = ({ prodcs, pagination }) => {
  const [click, setClick] = useState(false);
  const [mounted, setMounted] = useState(false);
  const setClickModal = (i) => {
    setClick(!click);
    index = i;
  };
  const { theme, setTheme } = useTheme();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCart());
    setMounted(true);
  }, []);
  let cart = useSelector((state) => {
    return state.cartFetch.total_items;
  });
  console.log(prodcs);
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
      <Navbar totaltems={cart} />
      <div className={styles.mainContainer} data-ison={theme}>
        <div className={styles.containerForContent}>
          <div>
            {click === true ? (
              <ModalForPhotos
                setClickModal={setClickModal}
                click={click}
                setClick={setClick}
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
