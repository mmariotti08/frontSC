import { useEffect, useState } from "react";
import ProductsContainer from "../../components/productsContainer/ProductsContainer";
import Carousel from "../../components/carousel/Carousel";
import { useDispatch } from "react-redux";
import { getProducts, getProductName } from "../../redux/actions";

const Home = ({toggle}) => {
  const dispatch = useDispatch();
  const [showCarousel, setShowCarousel] = useState(true);
  const [searchName, setSearchName] = useState("");



  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  const handleSearch = (name) => {
      console.log(name);
    setSearchName(name);
    if (name.trim() === "") {
      setShowCarousel(true);
      dispatch(getProducts());
    } else {
      setShowCarousel(false);
      dispatch(getProductName(name));
    }
  };

  return (
    <div>
      {toggle && <Carousel  /> }
      <ProductsContainer  />
    </div>
  );
};

export default Home;