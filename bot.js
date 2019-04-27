const dotenv = require('dotenv');
dotenv.config();

const TelegramBot = require('node-telegram-bot-api');
const Client = require('coinbase').Client;
const client = new Client({
	'apiKey': 'API KEY',
	'apiSecret': 'API SECRET',
	'version':'YYYY-MM-DD'
});

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const exchangeData = msg.text.split(' ')
  const exangeCurrency = exchangeData[0]
  const exangeAmount = Number(exchangeData[1]) 
  
  if(exchangeData)
    client.getSpotPrice({'currency': exangeCurrency}, function(err, price) {
    if (err) {
        bot.sendMessage(chatId, `Send currency letters like 'USD' or 'PLN' to obtain current BTC price`);    
    } else {
        bot.sendMessage(chatId, `Current bitcoin price in: ${exangeCurrency} is ${price.data.amount} ${exangeCurrency}`);
    }
  });
});