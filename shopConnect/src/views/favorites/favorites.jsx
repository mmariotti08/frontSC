import style from './favorites.module.css'
import { connect } from 'react-redux';
import Card from '../../components/Card/Card'; // Ruta correcta al componente Card
import { useEffect } from 'react';
const favorites = ({ fav }) => {

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])
  return (
    <div className={style.containerGeneral}>
      <h1 className={style.titule}>Mis Favoritos</h1>
        <div className={style.container}>
          {fav.length === 0 ? (
            <p className={style.mensaje}>No hay elementos en favoritos</p>
          ) : (
            <>
              {fav.map(item => (
                <Card key={item.id} props={item} />
              ))}
            </>
          )}
        </div>
    </div>
  );
};

const mapStateToProps = state => ({
  fav: state.fav
});

export default connect(mapStateToProps)(favorites);
