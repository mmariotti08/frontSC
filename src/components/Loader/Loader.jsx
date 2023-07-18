import "./Loader.css";
export const Loader = () => {
  return (
    <div className='Padre'>
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
