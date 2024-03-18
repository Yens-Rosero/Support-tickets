const { Client, Events, EmbedBuilder, AttachmentBuilder, Message, Emoji } = require('discord.js');
const env = require('../env/env');
const { responseTicket } = require('./components/ticketManagements/ticketManagement');
const { setCommands } = require('./components/loadCommands/loadCommands');

const client = new Client({
  intents: 3276799
});

// setCommands();

client.on(Events.ClientReady, () => console.log('Bot listo'));

client.on(Events.MessageCreate, async message => {
  if (message.mentions.repliedUser?.id === env.botClientId && (message.author.id != env.botClientId)) {
    const repliedMessage = await message.channel.messages.fetch(message.reference.messageId);

    if (message.content.trim().substring(0, '/responder'.length) !== '/responder') return;
    const ticketResponse = message.content.replace('/responder', '').trim();

    console.log(ticketResponse);

    if (repliedMessage.embeds.length) {
      const ticketID = repliedMessage.embeds[0].data.footer.text;

      // aqui va la validacion de si el ticket ya fue respondido/eliminado y la logica del envio correo

      message.reply(`Ticket *${ticketID}* respondido correctamente`);
      repliedMessage.react('✅');
    }
  }
  
  if (message.content.toLowerCase() === 'hola') return message.reply('Chao');
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'rticket') {
    await responseTicket(interaction);
    interaction.reply('Ticket respondido correctamente');
  }
});

const login = () => client.login(env.botToken);

module.exports = {
  client,
  login
}