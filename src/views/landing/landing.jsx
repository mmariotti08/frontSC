import React, { Suspense, useState } from 'react';
import { House } from '../../components/House/House';
import style from './Landing.module.css';
import { Link } from 'react-router-dom';

const Landing = () => {
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleClick = () => {
    setButtonClicked(true);
    // Realiza las acciones adicionales que desees al hacer clic en el botón
  };

  return (
    <div className={style.container}>
      <div className={style.canvasContainer}>
        <Canvas camera={{ zoom: 1, position: [15, 20, 15] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[-35, 35, 0]} intensity={0.4} />
          <Suspense fallback={null}>
            <House scale={[22, 22, 22]} />
          </Suspense>
          <OrbitControls />
        </Canvas>
      </div>

      <div >
  <div className={style.word} >The Best Sneakers</div>
  
  <div className={style.buttonContainer}>
    <Link to="/" className={style.button}>
      Ver Articulos
    </Link>
  </div>
</div>

    </div>
  );
};

export default Landing;
