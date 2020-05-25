import React from 'react';
import {View} from 'react-native';
import { BasicRow } from './rows';
import {P} from './Text'
import { format } from 'date-fns';
import { WeatherIcon } from '../components/WeatherIcon';


const WeatherForecast = ({forecast}) => {
	return (
		<>
			<BasicRow style={{justifyContent:'space-between'}}>
				<P style={{fontWeight: '700'}}>
					Date
				</P>
				<View style={{flexDirection: 'row'}}>
					<P style={{fontWeight: '700', marginRight: 10}}>Max</P>
					<P syle={{fontWeight: '700', marginLeft: 10}}>Low</P>
				</View>
			</BasicRow>

			{/** display forecast data */}
			{
				forecast.map(day =>(
					<BasicRow key={day.day} style={{justifyContent: 'space-between'}}>
						<P>{format(new Date(day.day), 'EE, d')}</P>
						<View style={{flexDirection: 'row'}}>
							<P style={{ fontWeight: '700', marginRight:20 }}><WeatherIcon icon={day.weatherIcon} /></P>
							<P style={{fontWeight: '700', marginLeft: 32 }} >{day.weatherCondidition}</P>
						</View>
						<View style={{flexDirection: 'row'}}>
							<P style={{ fontWeight: '700', marginRight: 10 }}> {Math.round(day.temp_max)}</P>
							<P style={{marginLeft: 15 }} >{Math.round(day.temp_min)}</P>
						</View>
					</BasicRow>
				))
			}
			{/** end display forecast data */}
		</>
	);
}

export default WeatherForecast;

