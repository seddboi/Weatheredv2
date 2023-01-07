import React from 'react';
import './daycard.css';

export function Daycard({data}) {
    const myDate = new Date(data.date * 1000);
    const convertedDate = myDate.toLocaleDateString("en-US", {timeZone: 'UTC'});
    
    return (
        <div className='mini-card'>
            <h4 id='plug-in-date'>{convertedDate}</h4>
            <img id='weather-icon' src={data.wicon} alt={data.wicon_text}></img>
            <h5 className="card-text">Max Temp: <span className='bold-text'>{data.max_temp} °F</span></h5>
            <h5 className="card-text">Min Temp: <span className='bold-text'>{data.min_temp} °F</span></h5>
            <h5 className="card-text">Chance Of Rain: <span className='bold-text'>{data.chance_of_rain} %</span></h5>
        </div>
    )
};