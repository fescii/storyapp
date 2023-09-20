// const {authtoken} = require("ngrok");
const axios = require('axios').default;
require('dotenv').config();
const { mpesaData, timeUtil } = require('../utils')
const { mpesaConfig } = require('../config')

//Load Database Object
const db = require('../models')
const Transaction = db.Transaction


getAccessToken = (req, res, next) => {
	const headers = {
		"Authorization": mpesaConfig.auth
	};
	
	axios
		.get(mpesaConfig.auth_url, { headers: headers })
		.then(response => {
			const data = response.data;
			console.log(data)
			req.token = data["access_token"];
			next();
		})
		.catch(err => {
			const errorMessage = err.response ? err.response.statusText : 'An error occurred';
			res.status(500).json({
				success: false,
				message: errorMessage
			});
		});
};

lipaNaMpesa = async (req, res) => {
	let token = req.token;
	let auth = `Bearer ${token}`;
	
	
	let amount = "1"; //you can enter any amount
	let partyA = "254713253018"; //should follow the format:2547xxxxxxxx
	let phoneNumber = "254713253018"; //should follow the format:2547xxxxxxxx
	
	// console.log(`${mpesaData.callBackUrl}/${partyA}`)
	try {
		
		const {data} = await axios.post(mpesaConfig.url, {
			"BusinessShortCode": mpesaData.bs_short_code,
			"Password": mpesaData.password,
			"Timestamp": mpesaData.timestamp,
			"TransactionType": mpesaData.transaction_type,
			"Amount": amount,
			"PartyA": partyA,
			"PartyB": mpesaData.partyB,
			"PhoneNumber": phoneNumber,
			"CallBackURL": `${mpesaData.callBackUrl}/${partyA}`,
			"AccountReference": mpesaData.accountReference,
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
		
	}
	catch (err) {
		const errorMessage = err.response ? err.response.statusText : 'An error occurred';
		return res.send({
			success: false,
			message: errorMessage
		});
	}
};

lipaNaMpesaCallback = async (req, res) => {
	//Get the transaction description
	try {
		// Parse the callback data sent by M-Pesa
		const {orderId} = req.params
		const callbackData = req.body;
		const resultCode = callbackData["Body"]["stkCallback"]["ResultCode"];
		const checkoutId = callbackData["Body"]["stkCallback"]["CheckoutRequestID"];
		const callbackMetadata = callbackData["Body"]["stkCallback"]["CallbackMetadata"];
		
		if (callbackMetadata){
			switch (resultCode) {
				case 0:
					const items = callbackMetadata.Item;
					// Initialize variables to store values
					let amount, mpesaReceiptNumber, phoneNumber, TransactionDate;
					
					// Iterate through items to find specific values
					for (const item of items) {
						switch (item.Name) {
							case "Amount":
								amount = item.Value;
								break;
							case "MpesaReceiptNumber":
								mpesaReceiptNumber = item.Value;
								break
							case "TransactionDate":
								console.log(item.Value)
								TransactionDate = timeUtil.localTime(item.Value);
								break;
							case "PhoneNumber":
								phoneNumber = item.Value;
								break;
						}
					}
					
					Transaction.create({
						orderId: orderId,
						checkoutId: checkoutId,
						date: TransactionDate,
						phone: phoneNumber,
						receipt: mpesaReceiptNumber,
						amount:  amount
					})
					.then(transaction => {
						console.log(`
							Transaction created successfully!\n,
							Transaction: ${transaction.values}`
						)
					})
					.catch(err => {
						console.log(`
							Error has occurred during Transaction init..\n,
							Error: ${err.message}`
						)
					});
					break;
				default:
					console.log("ResultCode is not 0. Data not available.");
					break;
			}
		}
		else {
			console.log("Request not successful");
		}
		
		// Send a response to acknowledge receipt of the callback
		return res.send({
			success: true,
			message: 'Callback received and processed successfully'
		});
		// res.status(200).json({ message: 'Callback received and processed successfully' });
	}
	catch (error) {
		console.error('Callback processing error:', error);
		
		// Handle errors and send an appropriate response
		res.status(500).json({error: 'Internal server error'});
	}
	
};

confirmPayment = async(req, res) => {
	try {
		const url = mpesaConfig.confirm_url;
		
		let token = req.token;
		let auth = `Bearer ${token}`;
		
		const timestamp = mpesaData.timestamp;
		// shortcode + passkey + timestamp
		const password = mpesaData.password
		
		const requestData = {
			BusinessShortCode:mpesaData.bs_short_code,
			Password: password,
			Timestamp: timestamp,
			CheckoutRequestID: req.params.CheckoutRequestID,
		};
		
		
		const {data} = await axios.post(url,  requestData, {
			"headers": {
				"Authorization": auth
			}
		}).catch(console.log);
		
		console.log(data)
		return res.send({
			success: true,
			message: data
		});
		
	} catch (error) {
		console.error("Error while trying to confirm payment:", error);
		res.status(503).send({
			success: false,
			message: "Something went wrong while trying to confirm payment. Contact admin",
			error: error,
		});
	}
}

const Mpesa = {
	getAccessToken: getAccessToken,
	lipaNaMpesa: lipaNaMpesa,
	lipaNaMpesaCallback: lipaNaMpesaCallback,
	confirmPayment: confirmPayment
};

module.exports = Mpesa;