import React from 'react';
import './hourly.css';
import 'animate.css';

export function Hourly({forecast}) {

    if (forecast === null) {
        return null;
    };

    // converts epoch to spelled out date
    function epochToDateString(num) {
        const epoch = new Date(forecast.location.localtime_epoch * 1000);
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        var wordDay = days[epoch.getDay()];
        var dayNum = epoch.getDate();
        var wordMonth = months[epoch.getMonth()];
        var year = epoch.getFullYear();

        return `${wordDay}, ${wordMonth} ${dayNum}, ${year} `;
    };

    function gatherHourlyFC() {
        const epoch = new Date(forecast.location.localtime_epoch * 1000);
        var currentHour = epoch.getHours(); //spits out a number 0-23
        // this grabs the array of times from the forecast state varibale passed in from parent 
        const hourArray = forecast.forecast.forecastday[0].hour.map((entry) => { //each temp will have index that matches currenHour
            let temp = entry.temp_f;
            return temp;
        });

        var updated = hourArray.slice(currentHour, 24);

        const hours = {
            0: '12:00 AM', 
            1: '1:00 AM',
            2: '2:00 AM', 
            3: '3:00 AM',
            4: '4:00 AM', 
            5: '5:00 AM', 
            6: '6:00 AM', 
            7: '7:00 AM', 
            8: '9:00 AM', 
            10: '10:00 AM',
            11: '11:00 AM', 
            12: '12:00 PM',
            13: '1:00 PM',
            14: '2:00 PM', 
            15: '3:00 PM',
            16: '4:00 PM',
            17: '5:00 PM',
            18: '6:00 PM',
            19: '7:00 PM',
            20: '8:00 PM',
            21: '9:00 PM', 
            22: '10:00 PM',
            23: '11:00 PM',
            24: '12:00 AM'
        };

        // this grabs the current hour, adjusts it for the proceeding hourly forecast, then creates the new array, updatedTimes, of string titles
        var updatedTimes = [];
        var newCurrentHour = currentHour + 1;
        for (let i = 0; i < updated.length; i++) {
            updatedTimes.push(hours[newCurrentHour]);
            newCurrentHour++;
        };

        const zippedHours = updated.map((e, i) => {
            return [e, updatedTimes[i]];
        });

        return zippedHours;
    };

    const hourlyFC = gatherHourlyFC();

    return (
        <section className='flex-grow-1 animate__animated animate__fadeIn' id='forecast'>
            <h1 className='m-3'><strong id='city-title' className='font-color'>{`${forecast.location.name}, ${forecast.location.region}`}</strong> <img alt={forecast.current.condition.text} id='wicon' src={forecast.current.condition.icon}></img></h1>
            <h3 id='hourly-date'>Today is <strong className='font-color'>{epochToDateString(forecast.location.localtime_epoch)}</strong>.</h3>
            <h4>It's currently <strong className='font-color'>{forecast.current.temp_f}°F</strong> and <strong className='font-color'>{forecast.current.condition.text}</strong>.</h4>
            <h4>It feels like <strong className='font-color'>{forecast.current.feelslike_f}°F</strong>.</h4>
            <h4>There is a current high temperature of <strong className='font-color'>{forecast.forecast.forecastday[0].day.maxtemp_f}°F</strong>,</h4>
            <h4>And there is a current low temperature of <strong className='font-color'>{forecast.forecast.forecastday[0].day.mintemp_f}°F</strong>.</h4>
            <h4>The chance of it raining is <strong className='font-color'>{forecast.forecast.forecastday[0].day.daily_chance_of_rain}%</strong>.</h4>
            <h4>The UV Index is a <strong className='font-color'>{forecast.current.uv} out of 10</strong>.</h4>
            <table className='hourly-forecast'>
                <tbody>
                    <tr>
                        {hourlyFC.map((temperature, index) => (
                        <td className='hours' key={index}>
                            <h4>{temperature[0]}</h4>
                            <p>{temperature[1]}</p>
                        </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </section>
    )
};