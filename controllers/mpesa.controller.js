const {authtoken} = require("ngrok");
const axios = require('axios').default;
require('dotenv').config();
const { mpesaData } = require('../middleware')
const { mpesaConfig } = require('../config')


getAuthToken = async (req, res, next) => {
	console.log('inside')
	//form a buffer of the consumer key and secret
	const buffer = new Buffer.from(mpesaConfig.consumer_key + ":" + mpesaConfig.consumer_secret);
	
	const auth = `Basic ${buffer.toString('base64')}`;
	
	try {
		
		const {data} = await axios.get(mpesaConfig.url, {
			"headers": {
				"Authorization": auth
			}
		});
		
		req.token = data['access_token'];
		
		return next();
		
	}
	catch (err) {
		
		return res.send({
			success: false,
			message: err['response']['statusText']
		});
		
	}
}

lipaNaMpesa = async (req, res) => {
	let token = req.token;
	let auth = `Bearer ${token}`;
	
	console.log(auth)
	
	let amount = "1"; //you can enter any amount
	let partyA = "254713253018"; //should follow the format:2547xxxxxxxx
	let phoneNumber = "254713253018"; //should follow the format:2547xxxxxxxx
	
	try {
		
		const {data} = await axios.post(mpesaConfig.url, {
			"BusinessShortCode": mpesaData.bs_short_code,
			"Password": mpesaData.password,
			"Timestamp": mpesaData.password,
			"TransactionType": mpesaData.transaction_type,
			"Amount": amount,
			"PartyA": partyA,
			"PartyB": mpesaData.partyB,
			"PhoneNumber": phoneNumber,
			"CallBackURL": mpesaData.callBackUrl,
			"AccountReference": mpesaData.callBackUrl,
			"TransactionDesc": mpesaData.transaction_desc
		}, {
			"headers": {
				"Authorization": auth
			}
		}).catch(console.log);
		
		return res.send({
			success: true,
			message: data
		});
		
	} catch (err) {
		
		return res.send({
			success: false,
			message: err['response']['statusText']
		});
		
	}
};

lipaNaMpesaCallback = (req, res) => {
	
	//Get the transaction description
	let message = req.body.Body.stkCallback['ResultDesc'];
	
	return res.send({
		success:true,
		message
	});
	
};

const Mpesa = {
	getAuthToken: authtoken,
	lipaNaMpesa: lipaNaMpesa,
	lipaNaMpesaCallback: lipaNaMpesaCallback
};

module.exports = Mpesa;