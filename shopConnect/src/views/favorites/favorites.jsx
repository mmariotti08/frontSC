
import { connect } from 'react-redux';
import Card from '../../components/Card/Card'; // Ruta correcta al componente Card

const favorites = ({ fav }) => {
  return (
    <div>
      <h1>Mis Favoritos</h1>
      {fav.length === 0 ? (
        <p>No hay elementos en favoritos</p>
      ) : (
        <div>
          {fav.map(item => (
            <Card key={item.id} props={item} />
          ))}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  fav: state.fav
});

export default connect(mapStateToProps)(favorites);
