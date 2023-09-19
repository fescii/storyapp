//we come up with the current timestamp
currentTimestamp = () => {
	const date = new Date();
	
	let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
	let day = String(date.getDate()).padStart(2, '0');
	let hour = String(date.getHours()).padStart(2, '0');
	let minute = String(date.getMinutes()).padStart(2, '0');
	let second = String(date.getSeconds()).padStart(2, '0');
	
	return `${date.getFullYear()}${month}${day}${hour}${minute}${second}`;
};

localTime = (dateNumeric) => {
	const dateString = dateNumeric.toString();
	console.log(dateString)
	const year = dateString.slice(0, 4);
	const month = dateString.slice(4, 6) - 1; // Months are zero-based (0-11)
	const day = dateString.slice(6, 8);
	const hours = dateString.slice(8, 10);
	const minutes = dateString.slice(10, 12);
	const seconds = dateString.slice(12, 14);
	
	const date = new Date(Date.UTC(year, month, day, hours, minutes, seconds));
	
	const options = { timeZone: 'Africa/Nairobi' }; // Set the time zone to East African Time (EAT)
	return new Intl.DateTimeFormat('en-US', options).format(date);
};


const Time = {
	timestamp : currentTimestamp(),
	localTime: localTime
};

module.exports = Time;