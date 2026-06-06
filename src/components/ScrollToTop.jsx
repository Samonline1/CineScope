import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation(); // path tracker

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // trigger when path changes 

  return null;
}

export default ScrollToTop;