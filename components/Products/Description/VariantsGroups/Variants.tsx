import styles from "../../../../styles/Description/DescriptionVariants.module.sass";
import { useTheme } from "next-themes";
const Variants = ({ prodcs }) => {
  const { theme, setTheme } = useTheme();

  console.log(prodcs.variant_groups);
  return (
    <div className={styles.ConForOptionsParentContainer}>
      <div>
        {prodcs.variant_groups.map((item) => {
          return (
            <div className={styles.ConForOptionsParent} data-ison={theme}>
              {item.options.map((item) => {
                return (
                  <div className={styles.ConForOptions} data-ison={theme}>
                    {item.name}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Variants;
