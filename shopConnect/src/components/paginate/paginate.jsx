
import "./Paginate.css";
import { useState } from "react";
import { paginate } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const Paginate = ({ max }) => {

  const dispatch = useDispatch();

  const page = useSelector((state) => state.page);

  const [input, setInput] = useState(page);

  const nextPage = () => {
    setInput(parseInt(input) + 1);
    dispatch(paginate(page + 1));
  };

  const previousPage = () => {
    setInput(parseInt(input) - 1);
    dispatch(paginate(page - 1));
  };

  const onKeyDown = (event) => {
    if (event.keyCode === 13) {
      if (
        parseInt(event.target.value) < 1 ||
        parseInt(event.target.value) > max ||
        isNaN(parseInt(event.target.value))
      ) {
        dispatch(paginate(1));
        setInput(1);
      } else {
        dispatch(paginate(parseInt(event.target.value)));
       
      }
    }
  };

  const onChange = (event) => {
    if (!isNaN(event.target.value)) {
      setInput(event.target.value);
    }
  };

  return (
    <div className="containerPaginacion">
      <button
        disabled={
          page < 2 ||
          isNaN(input) ||
          input === "" ||
          parseInt(input) !== page
        }
        onClick={previousPage}
      >
        {"<"}
      </button>
      <input
        onChange={(event) => onChange(event)}
        onKeyDown={(event) => onKeyDown(event)}
        name="page"
        autoComplete="off"
        value={input}
      />
      <p>
        Página {page} de {max}
      </p>
      <button
        disabled={
          page > max - 1 ||
          isNaN(input) ||
          input === "" ||
          parseInt(input) !== page
        }
        onClick={nextPage}
      >
        {">"}
      </button>
    </div>
  );
};

export { Paginate };

