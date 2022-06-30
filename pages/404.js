import styles from '../styles/notFound.module.sass'
import Navbar from '../components/Navbar/Navbar';
import { useSelector } from "react-redux";
import Link from 'next/link';
const NotFound = () => {
  const value = useSelector((state)=>{
    return state.SwitchToggle
  })
  let isOn = value
    return ( 
    <>
    <Navbar/>
    <div className={styles.mainContainer} data-ison={isOn}>
        <h2>Nic tu nie ma :0</h2>
        <Link href={"/"}>
        <a>
        <button>
          Powrót do strony głównej
        </button>
        </a>
        </Link>
    </div>
    </>);
}
export const getStaticProps = async () => {
    return {
      props: {},
      revalidate: true,
    };
  }; 

export default NotFound;