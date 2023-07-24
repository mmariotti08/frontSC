import { useDispatch, useSelector } from "react-redux";
import { getUsers, updateUser } from "../../redux/actions";
import { useEffect, useState } from "react";
import styles from "./Address.module.css";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../redux/actions";


const Addreses = () => {
  const cart = useSelector((state) => state.cart);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();


  const checkout = async () => {
    const cartDestructuring = cart.map((item) => ({
      idPrice: item.idPrice,
      quantity: 1,
    }));
    console.log(cartDestructuring);

    try {
      const data = await dispatch(createOrder({ items: cartDestructuring })); // Usar el despachador para llamar a createOrder
      console.log(data.url);
      if (data.url) {
        window.location.assign(data.url);
      }
    } catch (error) {
      console.error("Error al crear la orden:", error);
    }
  };

  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState({
    fullName: "",
    street: "",
    country: "",
    city: "",
    postalCode: 0,
    description: "",
  });
  const direction = {
    address: {
      fullName: data.fullName,
      street: data.street,
      country: data.country,
      city: data.city,
      postalCode: data.postalCode,
      description: data.description,
    },
  };

  const navigate = useNavigate();
  const user = useUser();
  const users = useSelector((state) => state.users);
  console.log(users);


  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getUsers());
        setIsLoading(false);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error("Error fetching users:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  let idUser = null;
  if (Array.isArray(users)) {
    idUser = users.find(
      (item) => item.mail === user.user?.primaryEmailAddress.emailAddress
    );
  }

  const handleSumbit = (e) => {
    e.preventDefault();
    console.log("Updating user with direction:", direction);
    dispatch(updateUser(idUser.id, direction));
    navigate(`/cart`);
  };

  const handleStreet = (e) => {
    setData({
      ...data,
      street: e.target.value,
    });
  };
  const handleCountry = (e) => {
    setData({
      ...data,
      country: e.target.value,
    });
  };

  const handleCity = (e) => {
    setData({
      ...data,
      city: e.target.value,
    });
  };
  const handlePostalCode = (e) => {
    setData({
      ...data,
      postalCode: e.target.value,
    });
  };
  const handleDescription = (e) => {
    setData({
      ...data,
      description: e.target.value,
    });
  };
  const handleFullName = (e) => {
    setData({
      ...data,
      fullName: e.target.value,
    });
  };
  console.log(idUser);

  const isDataValid = Object.values(errors).every((error) => error === "");
  const validate = () => {
    const newErrors = {};

    if (!data.fullName) {
      newErrors.fullName = "FullName is required";
    }

    if (!data.street) {
      newErrors.street = "Street is required";
    }

    if (!data.country) {
      newErrors.country = "Country is required ";
    }
    if (!data.city) {
      newErrors.city = "City is required";
    }

    if (!data.postalCode) {
      newErrors.postalCode = "PostalCode is required";
    }

    setErrors(newErrors);
  };

  useEffect(() => {
    validate();
  }, [data]);

  return (
    <div className={styles.cAddress}>
      <div className={styles.Addreses}>
        {isLoading ? (
          <div className={styles.loading}>
            <h1>Loading...</h1>
          </div>
        ) : (
          <form onSubmit={handleSumbit}>
            <h1 className={styles.h1}>Add Address</h1>
            <div className={styles.inputs}>
              <div>
                <label>Name and surname </label>
                <input
                  type="text"
                  value={data.fullName}
                  name="fullName"
                  onChange={handleFullName}
                  placeholder="Full Name..."
                />
                
              </div>
              {errors.fullName && (
                  <span className={styles.errorMessage}>{errors.fullName}</span>
                )}
            </div>
            <br />
            <div className={styles.inputs}>
              <div>
                <label>Street Address</label>
                <input
                  type="text"
                  value={data.street}
                  name="street"
                  onChange={handleStreet}
                  placeholder="Street Address..."
                />
              </div>
              {errors.street && (
                  <span className={styles.errorMessage}>{errors.street}</span>
                )}
              <br />
              <div>
                <label>Country</label>
                <input
                  type="text"
                  value={data.country}
                  name="country"
                  onChange={handleCountry}
                  placeholder="Country..."
                />
              </div>
              {errors.country && (
                  <span className={styles.errorMessage}>{errors.country}</span>
                )}
              <br />
              <div>
                <label>City</label>
                <input
                  type="text"
                  value={data.city}
                  name="city"
                  onChange={handleCity}
                  placeholder="City..."
                />
              </div>
              {errors.city && (
                  <span className={styles.errorMessage}>{errors.city}</span>
                )}
              <br />
              <div>
                <label>Postal Code</label>
                <input
                  type="number"
                  value={data.postalCode}
                  name="postalCode"
                  onChange={handlePostalCode}
                  placeholder="Postal Code..."
                />
              </div>
              {errors.postalCode && (
                  <span className={styles.errorMessage}>{errors.postalCode}</span>
                )}
              <br />
            </div>
            <div className={styles.desc}>
              <label>Description</label>
              <input
                type="text"
                value={data.description}
                name="description"
                onChange={handleDescription}
                placeholder="Description(optional)"
              />
            </div>
            <br />
            <button
            disabled={!isDataValid}
              onClick={checkout}
              type="sumbit"
              className={styles.finalize}>
              Next
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Addreses;
