import React , {Component} from 'react';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { ScrollView, SafeAreaView, View,Image } from 'react-native';
import {H1, TitleWeather, P, H2} from '../components/Text'
import { BasicRow } from '../components/rows';
import { format } from 'date-fns';
import weatherApi from '../util/weatherApi'
import {Container} from '../components/Container'
import { WeatherIcon } from '../components/WeatherIcon';


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

	firstLetter = (text) =>  {
		return text.charAt(0).toUpperCase() + text.slice(1);
	}

	getCurrentWeather = ({ zipcode, coords}) => {
		weatherApi('/weather', {zipcode, coords})
			.then(response => {
				// this.props.navigation.setParams({ title: response.name });
				this.setState({
					currentWeather: response,
					loadingCurrentWeather: false,
        });
			})
			.catch(err => {
				console.log('current error', err);
			});
	}

	getCurrentForecast = ({ zipcode, coords}) => {
		weatherApi('/forecast', {zipcode, coords})
			.then(response => {
				this.setState({
					loadingForecast: false,
					forecast: this.groupForecastByDay(response.list),
				})
			})
			.catch(err => {
				console.log('current error', err);
			});
	}

groupForecastByDay (list) {
  const data = {};

  list.forEach(item => {
    const [day] = item.dt_txt.split(' ');
    if (data[day]) {
      if (data[day].temp_max < item.main.temp_max) {
        data[day].temp_max = item.main.temp_max;
      }

      if (data[day].temp_min > item.main.temp_min) {
        data[day].temp_min = item.main.temp_min;
      }
    } else {
      data[day] = {
        temp_min: item.main.temp_min,
        temp_max: item.main.temp_max,
      };
		}
		data[day].weatherCondidition = item.weather[0].main
		data[day].weatherIcon = item.weather[0].icon
  });

  const formattedList = Object.keys(data).map(key => ({
    day: key,
    ...data[key],
  }));
  return formattedList;
};


render() {

	if(this.state.loadingCurrentWeather || this.state.loadingForecast) {
		return(
			<Container>
				<Image source={require('../assets/loading.gif')} style={{alignSelf: 'center', width:200, height:200, marginTop: 250}} />
			</Container>
		);
	}
		
	const { weather, main, name } = this.state.currentWeather;
			// console.log(this.state.currentWeather)
	return (
		<Container>
			<ScrollView>
				<SafeAreaView>
					{/** Weather information */}
					<TitleWeather> { this.firstLetter(name) } </TitleWeather>
					<H2> { this.firstLetter(weather[0].description) } </H2>
					<H1>{`${Math.round(main.temp)}`}</H1>
					<BasicRow>
						<H2>{`Humidity : ${main.humidity}%`}</H2>
					</BasicRow>
					<BasicRow>
						<H2>{`Low : ${Math.round(main.temp_min)}°`}</H2>
						<H2>{`High : ${Math.round(main.temp_max)}°`}</H2>
					</BasicRow>
						{/** End Weather information */}

						<View style={{	borderBottomColor: 'snow',borderBottomWidth: 1,width: '85%',marginTop: 20,alignSelf: 'center',}}/>
							
						{/** Forecast information */}
							<View style={{ paddingHorizontal: 10, marginTop: 20 }}>
								<BasicRow style={{ justifyContent: 'space-between' }} >
									<P style={{ fontWeight: '700' }} >Date</P>

									<View style={{ flexDirection: 'row' }}>
										{/* <P style={{ fontWeight: '700', marginLeft: 20 }} >Icon</P> */}
										{/* <P style={{ fontWeight: '700', marginLeft: 50 }} >Main</P> */}
									</View>

									<View style={{ flexDirection: 'row' }}>
										<P style={{ fontWeight: '700' }}> Max </P>
										<P style={{ fontWeight: '700', marginLeft: 10 }}>Low</P>
									</View>

								</BasicRow>

								{this.state.forecast.map(day => (
									<BasicRow
										key={day.day}
										style={{ justifyContent: 'space-between' }}
									>
									<P>{format(new Date(day.day), 'EE, d')}</P>
									<View style={{ flexDirection: 'row' }}>
										<P style={{ fontWeight: '700', marginRight:20 }} >
											<WeatherIcon icon={day.weatherIcon} />
										</P>
										<P style={{ fontWeight: '700', marginLeft: 32 }} >
											{day.weatherCondidition}
										</P>
									</View>
									<View style={{ flexDirection: 'row' }}>
										<P style={{ fontWeight: '700', marginRight: 10 }}>
											{Math.round(day.temp_max)}
										</P>
										<P style={{marginLeft: 15 }} >{Math.round(day.temp_min)}</P>
									</View>
									</BasicRow>
								))}
							</View>
						{/** End Forecast information */}
				</SafeAreaView>
			</ScrollView>
		</Container>
		);
	}
}

export default Detail;