import React, {Component} from 'react';
import { ListItem, SearchBar } from 'react-native-elements';
import {FlatList} from 'react-native'
import { cities } from "../util/cities";

class Search extends Component {
	
	constructor(props) {
		super(props); 
		this.state = {
			search: null,
			list : cities
		};
	}

  updateSearch = search => {
    this.setState(
			{ search },
			()=>{
				if(search == '') {
					this.setState({
						list : cities
					});
					return;
				} else {
					const newList = this.state.list.filter((item) => {
					const itemData = item.city ? item.city.toUpperCase() : ''.toUpperCase();
					const textData = search.toUpperCase();
					return itemData.includes(textData);
					// this.state.list = this.state.list.filter((item) => {
					// 	return item.city.includes(search);
					// }).map(({city, coords}) => {
					// 	return {city, coords}
					// });
				});
				this.setState({
					list: newList
				})
				}
		});
  };

	
	keyExtractor = (item, index) => index.toString()
	
	headerSearch = () => {
		return <SearchBar
						placeholder="Type Here..."
						clearIcon
						editable={true}
						value={this.state.search}
						onChangeText={this.updateSearch}
						round
						containerStyle={{backgroundColor:'#fff',borderStyle:'dashed'}}
					/>
	}

	renderItem = ({ item }) => (
		<ListItem
			title={item.city}
			subtitle={`Latitude : ${item.coords.latitude} Longitude : ${item.coords.longitude}`}
			bottomDivider
			onPress={() =>this.props.navigation.navigate('Detail', {coords: item.coords, name: item.city})
			}
		/>
	)
	
	render () {
		return (
			<>
				<FlatList
					ListHeaderComponent={this.headerSearch}
					keyExtractor={this.keyExtractor}
					data={this.state.list}
					renderItem={this.renderItem}
				/>
			</>
		);
	}
}

export default Search;