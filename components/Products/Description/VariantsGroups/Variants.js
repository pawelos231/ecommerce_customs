import styles from "../../../../styles/Description/DescriptionVariants.module.sass";
import { useSelector } from "react-redux";
const Variants = ({ prodcs }) => {
  const DarkMode = useSelector((state) => {
    return state.SwitchToggle;
  });

  console.log(prodcs.variant_groups);
  return (
    <div className={styles.ConForOptionsParentContainer}>
      <div>
        {prodcs.variant_groups.map((item) => {
          return (
            <div className={styles.ConForOptionsParent} data-ison={DarkMode}>
              {item.options.map((item) => {
                return (
                  <div className={styles.ConForOptions} data-ison={DarkMode}>
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
