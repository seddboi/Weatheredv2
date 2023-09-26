import React, { useState } from 'react';
import './overview.css';
import { RecentSearches } from '../Recent Searches/recentSearches';
import { Hourly } from '../Hourly/hourly';
import { Fiveday } from '../5 Day Forecast/fiveday';
import 'animate.css';

const axios = require('axios');

export function Overview() {
	const [forecast, setForecast] = useState(null);

	// this callback function receives the searched city entered from recentSearches and applies it to fetchForecast
	const getSearch = (searchedCity) => {
		fetchForecast(searchedCity);
	};

	const serverLink = 'https://weatheredd.app/forecast';

	async function fetchForecast(searchedCity) {
		await axios
			.get(serverLink, {
				params: {
					q: searchedCity,
				},
			})
			.then((response) => {
				setForecast(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	return (
		<div>
			<div className="jumbotron" id="heading-title">
				<h1>
					Welcome to <strong>Weathered</strong>!
				</h1>
				<h3>A Simple Weather Dashboard </h3>
			</div>

			<div className="container-fluid" id="homepage-skeleton">
				<div className="d-flex" id="center-page">
					<RecentSearches getSearch={getSearch} />

					<Hourly forecast={forecast} />
				</div>
			</div>

			<Fiveday forecast={forecast} />
		</div>
	);
}
