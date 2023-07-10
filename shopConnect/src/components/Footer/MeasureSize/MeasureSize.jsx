import styles from './MeasureSize.module.css'

const MeasurSize = ()=>{
    return(
        <div className={styles.container}>
            <h1>Guia de Talles</h1>
            <h3>Tomá las medidas de tus pies antes de elegir tus zapatillas, ojotas o calzado en general. Acordate de hacerlo al final de la jornada, ya que con el paso del día los pies pueden hincharse y así aumentar su tamaño. Distribuí el peso por igual en ambos pies y ponete unas medias que uses regularmente. Recordá medirte ambos pies. La medida entre ellos puede variar y tené en cuenta que siempre se toma como referencia el pie que tenga el mayor tamaño.</h3>
            <br/>
            <h2>Paso 1:</h2>
            <h3>Tomá un papel blanco y apoyalo en una superficie dura, perpendicular a la pared. Pegalo con cinta en los extremos para asegurarte de que no se mueva. Parate derecho y apoyá el talón contra el zócalo, sin que quede aire entre ambos.</h3>
            <br/>
            <img src="https://www.dexter.com.ar/on/demandware.static/-/Sites-Dexter-Library/default/dwe9ed6e8f/images/talles/tallespie1.jpg" />
            <br/>
            <h2>Paso 2:</h2>
            <h3>Con un lápiz o lapicera marcá sobre el papel el contorno entero del pie, el cual debe estar relajado, sin contraer los dedos. Acordate de repetir el proceso con el otro pie.</h3>
            <br/>
            <img src="https://www.dexter.com.ar/on/demandware.static/-/Sites-Dexter-Library/default/dw3419c4d9/images/talles/tallespie2.jpg" />
            <br/>
            <h2>Paso 3:</h2>
            <h3>Tomá la cinta métrica y medí la longitud que va desde el talón hasta dedo más largo que tengas. Repetí este paso con el otro pie. La medida más extensa, será el tamaño de referencia en centímetros.</h3>
            <br/>
            <img src="https://www.dexter.com.ar/on/demandware.static/-/Sites-Dexter-Library/default/dw766e8056/images/talles/tallespie3.jpg" />
            <br/>
        </div>
    )
}

export default MeasurSize;