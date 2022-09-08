import styles from "../../../styles/Modal.module.sass";
import Image from "next/image";
import { motion } from "framer-motion";
import { shimmer, toBase64 } from "../../ShimmerEffect/Shimmer";
const ModalForPhotos = ({
  setClickModal,
  itemId,
  prodcs,
}: {
  setClickModal: any;
  itemId: any;
  prodcs: any;
}) => {
  let width: number = prodcs.assets[itemId].image_dimensions.width;
  let height: number = prodcs.assets[itemId].image_dimensions.height;
  let displayHeight: number = (height + 140) / window.innerHeight;
  width = width / displayHeight;
  height = height / displayHeight;
  const src: string = prodcs.assets[itemId].url;
  return (
    <motion.div
      className={styles.ModalCon}
      onClick={setClickModal}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
    >
      <div className={styles.photoContainer}>
        <Image
          src={src}
          alt={`${itemId} image of ${prodcs.name}`}
          width={width}
          height={height}
          placeholder="blur"
          quality={75}
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(width, height)
          )}`}
        />
      </div>
    </motion.div>
  );
};

export default ModalForPhotos;
