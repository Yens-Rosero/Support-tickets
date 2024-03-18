const { REST, Routes } = require('discord.js');
const env = require('../../../env/env');

const commands = [
  {
    name: 'rticket',
    description: 'Responde el ticket',
    options: [
      {
        name: 'ticket_id',
        description: 'El ID del ticket a responder',
        type: 3
      },
      {
        name: 'response_text',
        description: 'Texto de respuesta del ticket a responder',
        type: 3
      },
    ]
  },
];

const rest = new REST({ version: '10' }).setToken(env.botToken);

const setCommands = async () => {
  try {
    console.log('Started refreshing application (/) commands.');
  
    await rest.put(Routes.applicationCommands(env.botClientId), { body: commands });
  
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
}


module.exports = {
  setCommands
}