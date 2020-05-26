const ApiKey = '68507a7edfee95a521722fd44b3a9a89';

const weatherApi = (path, { zipcode, coords }) => {
	let data = ''
	if(zipcode) {
		data = `zip=${zipcode}`;
	} else if (coords) {
		data = `lat=${coords.latitude}&lon=${coords.longitude}`;
	}
	return fetch(
		`https://api.openweathermap.org/data/2.5/${path}?lat=${coords.latitude}&lon=${coords.longitude}&appid=${ApiKey}&units=metric`
	)
	.then(response => response.json())
}
export default weatherApi;