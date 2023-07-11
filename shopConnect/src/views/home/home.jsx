import { useEffect, useState } from "react";
import ProductsContainer from "../../components/productsContainer/productsContainer";
import Carousel from "../../components/carousel/Carousel";
import Order from '../../components/Order/order'
import Filter from '../../components/Filter/Filter'
import { useDispatch } from "react-redux";
import { getProducts, getProductName } from "../../redux/actions";

const Home = ({toggle}) => {
  const dispatch = useDispatch();
  const [showCarousel, setShowCarousel] = useState(true);
  const [searchName, setSearchName] = useState("");



  useEffect(() => {
    dispatch(getProducts());
    window.scrollTo(0, 0);
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
      <Order/>
      <Filter />
      <ProductsContainer  />
    </div>
  );
};

export default Home;