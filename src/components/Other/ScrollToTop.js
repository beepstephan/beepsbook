import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
  const { pathName } = useLocation();
  useEffect(() => {
    window.scroll(0,0);
  }, [pathName])
  return null;
}
