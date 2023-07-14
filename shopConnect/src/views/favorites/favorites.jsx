import style from './favorites.module.css'
import { connect } from 'react-redux';
import Card from '../../components/Card/Card';
import { useEffect } from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const favorites = ({ fav }) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={style.containerGeneral}>
      <h1 className={style.titule}>My Favorites</h1>
      <div className={style.container}>
        {fav.length === 0 ? (
          <p className={style.mensaje}>Add products to your favorite</p>
        ) : (
          <>
            {fav.map(item => (
              <Card key={item.id} props={item} />
            ))}
          </>
        )}
      </div>
      <ToastContainer /> {/* Agrega el ToastContainer aquí para que se muestre en el componente favorites */}
    </div>
  );
};

const mapStateToProps = state => ({
  fav: state.fav
});

export default connect(mapStateToProps)(favorites);
