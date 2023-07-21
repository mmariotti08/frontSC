import React, { useState } from "react";
import style from './Suggestions.module.css'


const Suggestions = () => {
    const [suggestions, setSuggestions] = useState('');


    return(
        <div>
            <div className={style.divSug}>
        <label className={style.label}>Suggestions:</label>
        <div>
        <textarea className={style.text} 
        placeholder='Write here...' 
        value={suggestions} 
        onChange={(e) => setSuggestions(e.target.value)} />
        </div>
        <div>
      <button className={style.send} type="submit">Send</button>
      </div>
      </div>
        </div>

    )
}

export default Suggestions;