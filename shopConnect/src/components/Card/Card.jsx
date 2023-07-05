import "./Card.css";
import { Link } from "react-router-dom";

const Card = ({ props }) => {
    return (
        <>
            <div className="container-card">
                <Link to={`/products/${props.id}`}>
                    <div className="container-img-card">
                        <img src={props.main_picture_url} alt="" />
                    </div>
                    <div className="props-card">
                        <div className="container-name">
                            <h4>{props.name}</h4>
                        </div>
                        <div>
                            <h3>${props.retail_price_cents}</h3>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    );
};

export default Card ;