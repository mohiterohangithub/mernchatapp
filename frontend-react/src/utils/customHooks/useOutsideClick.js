import { useEffect } from "react";

function useOutsideClick(ref, callbackFunc) {
  const outsideclick = (e) => {
    e.preventDefault();
    if (ref.current && !ref.current.contains(e.target)) {
      callbackFunc();
    }
  };

  useEffect(() => {
    document.addEventListener("click", outsideclick);

    return () => document.removeEventListener("click", outsideclick);
  }, [ref.current]);
}

export default useOutsideClick;
