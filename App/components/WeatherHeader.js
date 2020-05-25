import React from 'react';
import {H1, TitleWeather, H2} from './Text'
import { BasicRow } from './rows';
import { View } from 'native-base';

const WeatherHeader = ({name, weather, main, firstLetter}) => {
	return (
		<>	
			<View>
				<TitleWeather> { firstLetter(name) } </TitleWeather>
			</View>
			<View>
				<H2> { firstLetter(weather[0].description) } </H2>
				<H1>{`${Math.round(main.temp)}`}</H1>
			</View>
			<BasicRow>
				<H2>{`Humidity : ${main.humidity}%`}</H2>
			</BasicRow>
			<BasicRow>
				<H2>{`Low : ${Math.round(main.temp_min)}°`}</H2>
				<H2>{`High : ${Math.round(main.temp_max)}°`}</H2>
			</BasicRow>
		</>
	);
}

export default WeatherHeader;