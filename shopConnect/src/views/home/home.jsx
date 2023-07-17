import { useEffect, useState } from "react";
import ProductsContainer from "../../components/productsContainer/productsContainer";
import Carousel from "../../components/carousel/Carousel";
import Order from "../../components/Order/order";
import Filter from "../../components/Filter/Filter";
import { useDispatch } from "react-redux";
import { getProducts, getProductName } from "../../redux/actions";
import { useUser, useAuth } from "@clerk/clerk-react";
import { addUser } from "../../redux/actions";
import { Loader } from "../../components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = ({ toggle }) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const { isSignedIn } = useUser();

  const handleCloseModal = () => {
    closeModal();
  };

  const { accessToken } = useAuth();

  const user = useUser();

  if (isSignedIn) {
    const userDestructuringprueba = {
      name: user.user.fullName, // ? user.user.fullName : null ,
      mail: user.user.primaryEmailAddress.emailAddress, // ?  user.user.primaryEmailAddress.emailAddress : null,
    };
    dispatch(addUser(userDestructuringprueba));
  }

  const [showCarousel, setShowCarousel] = useState(true);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    const loadData = async () => {
      // Simulación de tiempo de carga
      await new Promise((resolve) => setTimeout(resolve, 2000));
      dispatch(getProducts());
      window.scrollTo(0, 0);
      setIsLoading(false); // Finaliza la carga
    };

    loadData();
  }, [dispatch]);
  
  const handleSearch = (name) => {
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
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {toggle && <Carousel />}
          <Order />
          <Filter />
          <ProductsContainer />
          <ToastContainer />
        </>
      )}
    </div>
  );
};

export default Home;
