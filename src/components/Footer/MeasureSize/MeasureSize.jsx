import styles from './MeasureSize.module.css'

const MeasurSize = ()=>{
    window.scrollTo(0, 0);
    return(
        <div className={styles.container}>
            <h1>Size Guide</h1>
            <h3>Take the measurements of your feet before choosing your sneakers, sandals, or footwear in general. Remember to do it at the end of the day, as feet can swell and increase in size as the day goes on. Distribute the weight evenly on both feet and wear socks that you regularly use. Remember to measure both feet. The measurement between them may vary, and always take the foot with the larger size as the reference.</h3>

            <br/>
            <h2>Step 1:</h2>
            <h3>Take a white paper and place it on a hard surface, perpendicular to the wall. Secure it with tape on the edges to make sure it doesn't move. Stand straight and place your heel against the baseboard, ensuring there is no gap between them.</h3>
            <br/>
            <img src="https://www.dexter.com.ar/on/demandware.static/-/Sites-Dexter-Library/default/dwe9ed6e8f/images/talles/tallespie1.jpg" />
            <br/>
            <h2>Step 2:</h2>
            <h3>Using a pencil or pen, trace the entire outline of your foot on the paper. Your foot should be relaxed, without curling your toes. Remember to repeat the process with the other foot.</h3>
            <br/>
            <img src="https://www.dexter.com.ar/on/demandware.static/-/Sites-Dexter-Library/default/dw3419c4d9/images/talles/tallespie2.jpg" />
            <br/>
            <h2>Step 3:</h2>
            <h3>Take the measuring tape and measure the length from the heel to the longest toe you have. Repeat this step with the other foot. The longest measurement will be the reference size in centimeters.</h3>
            <br/>
            <img src="https://www.dexter.com.ar/on/demandware.static/-/Sites-Dexter-Library/default/dw766e8056/images/talles/tallespie3.jpg" />
            <br/>
        </div>
    )
}

export default MeasurSize;