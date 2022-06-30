import { useEffect, useRef } from "react";

export const useDimensions = (ref) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    dimensions.current.width = 300;
    dimensions.current.height = 500;
  }, []);

  return dimensions.current;
};
