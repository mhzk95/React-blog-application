import { useEffect } from "react";
import { useLocation } from "react-router-dom";
  
export default function ScrollToTop() {
  const routePath = useLocation();

  useEffect(() => {
    if(routePath.pathname == '/'){
      return 
    }
    else if(routePath.hash.includes('#')){
      return
    } else window.scrollTo(0,0)
    
  }, [routePath]);
  
  return null;
}
