import { useState, useEffect } from "react";
import {SetSized} from '../interfaces/interfacesAboutUserDetails'
const useWindowSize = () : SetSized => {
    const [windowSize, setWindowSize] = useState<SetSized>({
        width: undefined,
        height: undefined,
      });
    useEffect(() => {
        function handleResize() {
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
      }, []); 
      return windowSize
}
export default useWindowSize