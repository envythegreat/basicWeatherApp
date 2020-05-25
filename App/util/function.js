// Capitalize First Letter 
export const  firstLetter = (text) =>  {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export const  groupForecastByDay =  (list) => {
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