import React, { useLayoutEffect, useState, useEffect, useRef } from "react";

function useWindowSize(ref) {
  
  const [size, setSize] = useState([0, 0]);
  console.log(ref);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([ref?.current?.clientWidth, ref?.current?.clientHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

export default function ShowWindowDimensions(props) {
  const [width, height] = useWindowSize();
  useEffect(() => {
    console.log(width);
    console.log(height);
  }, [width, height]);
  return (
    <p>
      Window size: {width} x {height}
    </p>
  );
}