const { mpesaConfig } = require('../config')
const  timestamp = require('../middleware/timestamp.middleware')

module.exports = {
	url: mpesaConfig.url,
	bs_short_code: mpesaConfig.shortcode,
	passkey: mpesaConfig.passkey,
	timestamp: timestamp,
	
	password: new Buffer.from(`${mpesaConfig.shortcode}${mpesaConfig.passkey}${timestamp}`).toString('base64'),
	transaction_type: "CustomerPayBillOnline",
	amount: "1", //you can enter any amount
	partyA: "party-sending-funds", //should follow the format:2547xxxxxxxx
	partyB: mpesaConfig.shortcode,
	phoneNumber: "party-sending-funds", //should follow the format:2547xxxxxxxx
	callBackUrl: "https://9778-2c0f-fe38-2326-d804-a85c-a505-b96c-ecd7.ngrok.io/mpesa/callback",
	accountReference: "lipa-na-mpesa-tutorial",
	transaction_desc: "Testing lipa na mpesa functionality"
};