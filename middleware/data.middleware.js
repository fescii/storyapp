const { mpesaConfig } = require('../config')
const  Time = require('./time.middleware')


module.exports = {
	url: mpesaConfig.url,
	auth_url: mpesaConfig.auth_url,
	bs_short_code: mpesaConfig.shortcode,
	passkey: mpesaConfig.passkey,
	timestamp: Time.timestamp,
	
	password: new Buffer.from(`${mpesaConfig.shortcode}${mpesaConfig.passkey}${Time.timestamp}`).toString('base64'),
	transaction_type: "CustomerPayBillOnline",
	amount: "1", //you can enter any amount
	partyA: "party-sending-funds", //should follow the format:2547xxxxxxxx
	partyB: mpesaConfig.shortcode,
	phoneNumber: "party-sending-funds", //should follow the format:2547xxxxxxxx
	callBackUrl: "https://805a-2c0f-fe38-2326-d804-138a-e2a7-eb22-45a0.ngrok-free.app/mpesa/callback",
	accountReference: "lipa-na-mpesa-tutorial",
	transaction_desc: "Testing lipa na mpesa functionality"
};