const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
const discordBot = require("../../bot");

const sendTicket = async data => {
  const ticketsChannel = discordBot.client.channels.cache.find(c => c.name === 'support');

  let ticketTextMessage = 
  `***Asunto:*** ${data.ticket.subject}` + '\n' +
  `***Descripción:*** ${data.ticket.description}` + '\n' +
  `***Nombre:*** ${data.ticket.username}` + '\n' +
  `***Correo:*** ${data.ticket.email}` + '\n';

  if (data.ticket.number) ticketTextMessage += `***Número:*** ${data.ticket.number}` + '\n';

  const exampleEmbed = new EmbedBuilder()
    .setTitle('Ticket - ' + data.ticket.company)
    .setDescription(ticketTextMessage)
    .setFooter({ text: data.ticketid });

  const attachments = [];

  for (const [ key, file ] of data.files.entries()) {
    const b64String = file.split(',')[1];
    const fileType = file.split(';')[0].split('/')[1];
    const attachment = new AttachmentBuilder(Buffer.from(b64String, 'base64'), { name: `${key}_${data.ticketid}.${fileType}` });
    attachments.push(attachment);
  }

  ticketsChannel.send({
    embeds: [ exampleEmbed ]
  }).then(a => {
    if (attachments.length) a.reply({
      files: attachments
    })
  });
}

module.exports = {
  sendTicket
}