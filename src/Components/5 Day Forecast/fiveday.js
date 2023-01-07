import React from 'react';
import './fiveday.css';
import 'animate.css';

import {Daycard} from '../Day Card/daycard';

export function Fiveday({forecast}) {

    if (forecast == null) {
        return null;
    };

    const dataone = {
        date: forecast.forecast.forecastday[1].date_epoch,
        max_temp: forecast.forecast.forecastday[1].day.maxtemp_f,
        min_temp: forecast.forecast.forecastday[1].day.mintemp_f,
        chance_of_rain: forecast.forecast.forecastday[1].day.daily_chance_of_rain,
        wicon: forecast.forecast.forecastday[1].day.condition.icon,
        wicon_text: forecast.forecast.forecastday[1].day.condition.text,
    };

    const datatwo = {
        date: forecast.forecast.forecastday[2].date_epoch,
        max_temp: forecast.forecast.forecastday[2].day.maxtemp_f,
        min_temp: forecast.forecast.forecastday[2].day.mintemp_f,
        chance_of_rain: forecast.forecast.forecastday[2].day.daily_chance_of_rain,
        wicon: forecast.forecast.forecastday[2].day.condition.icon,
        wicon_text: forecast.forecast.forecastday[2].day.condition.text,
    }

    return (
        <div className='jumbotron animate__animated animate__fadeIn' id='five-day-section'>
            <h3 className='three-day-title'>Next Couple of Days</h3>

            <div className='container-fluid' id='five-day-forecast'>
                <Daycard data={dataone} />
                <Daycard data={datatwo} />
            </div>
        </div>
    )
};