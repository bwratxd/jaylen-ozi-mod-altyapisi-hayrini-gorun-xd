const moment = require("moment");
moment.locale("tr");
const conf = require("../configs/sunucuayar.json");
const ayar = require("../configs/settings.json");
const { MessageEmbed } = require("discord.js");
const client = global.bot;

module.exports = async (oldMessage, newMessage) => {
  if (oldMessage.author.bot) return;

  const channel = client.channels.cache.find(x => x.name == "message_log");
  if (!channel) return;
  const embed = new MessageEmbed()
    .setAuthor({ name : newMessage.member.displayName, iconURL: newMessage.author.avatarURL({ dynamic: true })})
    .setColor("RANDOM")
    .setTitle(`${newMessage.channel.name} adlı kanalda bir mesaj düzenlendi!`)
    .setDescription(`**İlk Hali:**\n\`\`\`\n${oldMessage.content}\n\`\`\`\n**Düzenlenen Hali:**\n\`\`\`\n${newMessage.content}\n\`\`\``)
    .setFooter({ text :`ID: ${newMessage.author.id} • ${moment().add(3, "hours").calendar()}`});

  if (newMessage.attachments.first()) embed.setImage(newMessage.attachments.first().proxyURL);
  channel.wsend({ embeds: [embed]});
};

module.exports.conf = {
  name: "messageUpdate",
};
