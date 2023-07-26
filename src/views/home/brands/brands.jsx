import styles from "./brands.module.css";
import Carousel from "react-multi-carousel";
import img1 from "./img/4LjLjxt5jRlBU2o7xVd4Yhjf0SPs5Jou4dIYMcpM.svg";
import img2 from "./img/90AbiVLmDTEko3dRlSBVABMhqlnUxBnzFYt4mYGP.svg";
import img3 from "./img/eIRaVw8zVTB91QVRkLE8FWaUC8zeoDnU23K5Ck3B.svg";
import img4 from "./img/GIQupeZgNrX6IpKXw17THhMAJFReiIjq4Qy14YuJ.svg";
import img5 from "./img/GkTICknUbdAb8hoifkmqEBe0UhbukGdYsCfROVjF.svg";
import img6 from "./img/KtDOdORk9Gr9xxD0IwY8KUJx5gDrbLRDsLKw3oHA.svg";
import img7 from "./img/P7Vv1VlTMHTEPOeqFBpX9vsnycbyEFDDgmAFgHy3.svg";
import img8 from "./img/WUX6XQFodxCXEL1QWIwHsOMrUY8BMnfjvXLk89GY.svg";
import img9 from "./img/Z5FwwXKVzimMMJFIK4QuYIq35eujeMafvDcrpKnh.svg";

const Brands = () => {
    const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5
        },
        tablet1: {
          breakpoint: { max: 1100, min: 464 },
          items: 4
        },
        tablet2: {
          breakpoint: { max: 800, min: 464 },
          items: 3
        },
        mobile: {
          breakpoint: { max: 650, min: 0 },
          items: 2
        }
    };

    return (
        <div id={styles.brands}>
            <Carousel
                swipeable={true}
                draggable={true}
                responsive={responsive}
                ssr={true}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={4000}
                arrows={false}
                >
                {images.map((image, index) => (
                    <div key={`${image}-${index}`}>
                        <img src={image} alt={`Brand ${index + 1}`} style={{ width: '50px', height: 'auto' }} />
                    </div>
                ))}
            </Carousel>
        </div>
    )
};

export { Brands };