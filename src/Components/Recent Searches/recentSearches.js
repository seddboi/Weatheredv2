import React, {useState} from 'react';
import './recentSearches.css';
import 'animate.css';
// import $ from 'jquery';

export function RecentSearches({getSearch}) {
    const [city, setCity] = useState('');
    const [recents, setRecents] = useState([]);

    const onSubmit = e => {
        e.preventDefault();
        
        if (!city || city === '') {
            alert('Please enter a valid city.');
            return;
        } else {
            addRecent(city);
            getSearch(city);
        }  

    }
 
    const onChange = (e) => {
        setCity(e.target.value);
    }; 

    // function which takes in searched entry and adds entry to recent searches array
    function addRecent(newSearch) {
        if (recents.includes(newSearch)) {
            return;
        } else {
            setRecents((prev) => [newSearch, ...prev]);
        }
        // clear our search bar entry
        setCity('');
    }; 

    const searchAgain = (e) => {
        const recent = e.target.innerHTML;
        setCity(recent);
        onSubmit(e);
    }

    if (recents.length === 0 ) {
        return (
            <section id='before-recents' className='before-search-bar-recents' >
                <form onSubmit={onSubmit} >
                    <label className="form-label" htmlFor="search-bar">Search A City</label><br/>
                    <input className='form-text' id="search-bar" type='text' value={city} placeholder="Las Vegas, etc." onChange={onChange}/>
                    <input className='form-button' id='search-button' type='submit' value='Search'/>
                </form>
        </section>
        )
    }  
    
    return (
        <section className='after-search-bar-recents animate__animated animate__fadeInLeft'>
            <h3 className='title'>Recents</h3>
            <div id='insert-recent-buttons' >{recents.map((entry, index) => <button className='entry' key={index} onClick={searchAgain} >{entry}</button>)}</div>

            <form className='form'onSubmit={onSubmit} >
                <label className="form-label" htmlFor="search-bar">Search A City</label>
                <input className='form-text' id="search-bar" type='text' value={city} placeholder="Las Vegas, etc." onChange={onChange}/>
                <input className='form-button' id='search-button' type='submit' value='Search'/>
            </form>
        </section>
    )
};