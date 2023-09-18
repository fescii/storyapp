//we come up with the current timestamp
const currentTimestamp = () => {
	const date = new Date()
	
	let month = date.getMonth();
	month = month < 10 ? `0${month}` : month;
	
	let day = date.getDay();
	day = day < 10 ? `0${day}` : day;
	
	let hour = date.getHours();
	hour = hour < 10 ? `0${hour}` : hour;
	
	let minute = date.getMinutes();
	minute = minute < 10 ? `0${minute}` : minute;
	
	let second = date.getSeconds();
	second = second < 10 ? `0${second}` : second;
	
	return `${date.getFullYear()}${month}${day}${hour}${minute}${second}`;
};

module.exports = {
	timestamp : currentTimestamp()
};