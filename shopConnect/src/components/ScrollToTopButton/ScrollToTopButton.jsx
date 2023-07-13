import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import style from './boton.module.css'

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const isButtonVisible = scrollTop > 200; // Mostrar el botón cuando el desplazamiento vertical sea mayor a 200px
      setShowButton(isButtonVisible);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={style.boton}>
      {showButton && (
        <button onClick={scrollToTop} className={style.figura}>
          <FaArrowUp  />
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
