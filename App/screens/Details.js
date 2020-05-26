import React , {Component} from 'react';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { ScrollView, SafeAreaView, View,Image } from 'react-native';


import WeatherHeader from '../components/WeatherHeader';
import WeatherForecast from '../components/WeatherForecast';
import { groupForecastByDay, firstLetter } from '../util/function';
import weatherApi from '../util/weatherApi';
import {Container} from '../components/Container';



class Detail extends Component {

  state = {
    currentWeather: {},
		loadingCurrentWeather: true,
		forecast: [],
		loadingForecast: true
	};
	
	componentDidMount() {
		Permissions.askAsync(Permissions.LOCATION)
		.then(({ status }) => {
			if (status !== 'granted') {
				throw new Error('Permission to access location was denied');
			}
			return Location.getCurrentPositionAsync();
		})
		.then(position => {
			this.getCurrentWeather({ coords: position.coords });
			this.getCurrentForecast({ coords: position.coords });
		});
	}

	componentDidUpdate(prevProps) {
		const oldCoords = prevProps.navigation.getParam('coords')
		const newCoords = this.props.navigation.getParam('coords');
		if(newCoords && oldCoords !== newCoords) {
			this.getCurrentWeather({ coords: newCoords });
			this.getCurrentForecast({ coords: newCoords });
		}
	}
	
	// Get Current Weather Based on the Coords or Zipcode
	getCurrentWeather = ({ zipcode, coords}) => {
		weatherApi('/weather', {zipcode, coords})
			.then(response => {
				this.setState({
					currentWeather: response,
					loadingCurrentWeather: false,
        });
			})
			.catch(err => {
				console.log('current error', err);
			});
	}

	// Get Current Forecast Based on the Coords or Zipcode
	getCurrentForecast = ({ zipcode, coords}) => {
		weatherApi('/forecast', {zipcode, coords})
			.then(response => {
				this.setState({
					loadingForecast: false,
					forecast: groupForecastByDay(response.list),
				})
			})
			.catch(err => {
				console.log('current error', err);
			});
	}




	render() {

		if(this.state.loadingCurrentWeather || this.state.loadingForecast) {
			return(
				<Container>
					<Image source={require('../assets/loading.gif')} style={{alignSelf: 'center', width:200, height:200, marginTop: 250}} />
				</Container>
			);
		}
			
		const { weather, main, name } = this.state.currentWeather;
		// console.log(this.props.navigation.getParam('coords'))
		// console.log(Date.now())
		return (
			<Container>
				<ScrollView>
					<SafeAreaView>
						<WeatherHeader weather={weather} name={name} main={main} firstLetter={firstLetter}  cityTitle={this.props.navigation.getParam('name')}/>
						<View style={{	borderBottomColor: 'snow',borderBottomWidth: 1,width: '85%',marginTop: 20,alignSelf: 'center',}}/>
						<WeatherForecast forecast={this.state.forecast} />
					</SafeAreaView>
				</ScrollView>
			</Container>
		);
	}
}

export default Detail;