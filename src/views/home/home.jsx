import { useEffect, useState, useRef } from "react";
import ProductsContainer from "../../components/productsContainer/productsContainer";
import Carousel from "../../components/carousel/Carousel";
import Filter from "../../components/Filter/Filter";
import { useDispatch } from "react-redux";
import { getProducts, getProductName } from "../../redux/actions";
import { useUser, useAuth } from "@clerk/clerk-react";
import { addUser } from "../../redux/actions";
import { Loader } from "../../components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = ({ toggle }) => {

  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const { isSignedIn } = useUser();

  const handleCloseModal = () => {
    closeModal();
  };

  const user = useUser();

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

  const [userAdded, setUserAdded] = useState(false);

  useEffect(() => {
    if (isSignedIn && !userAdded) {
      const userCreate = {
        name: user.user.fullName, 
        last_name: user.user.lastName,
        mail: user.user.primaryEmailAddress.emailAddress, 
        idUser: user.user.id,
      };
      dispatch(addUser(userCreate));
      setUserAdded(true); // Actualizar el estado para que no se llame addUser nuevamente
    }
  }, [isSignedIn, userAdded, dispatch, user.user]);

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
          <Filter />
          <ProductsContainer />
          <ToastContainer />
        </>
      )}
    </div>
  );

};

export default Home;
