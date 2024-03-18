const path = require('path');
require('dotenv').config({ path: path.join(__dirname).replace('/src/env', '').replace('\\src\\env', '') + '/.env'});

const env = {
  botToken: process.env.BOTTOKEN,
  botClientId: process.env.BOTCLIENTID,
  botSupportChannelName: process.env.BOTSUPPORTCHANNELNAME,
  mongoURL: process.env.MONGO_URI
}

module.exports = env;