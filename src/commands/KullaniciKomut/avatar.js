const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
const conf = require("../../configs/sunucuayar.json")
const axios = require('axios');
const fetch = require('node-fetch')
const client = global.bot;

module.exports = {
    conf: {
      aliases: ["avatar","av"],
      name: "avatar",
      help: "avatar"
    },
  
run: async (client, message, args, embed, prefix) => {
	if (!message.guild) return;
  const row = new MessageActionRow()
  .addComponents(
      new MessageSelectMenu()
      .setCustomId('banner')
      .setPlaceholder('Bannerını görüntülemek için tıklayınız!')
      .addOptions([
          {
              label: 'Banner',
              description: 'Bannerını görüntülemek için tıklayınız.',
              value: 'banner',
          }
      ]),
  );
let üye = args.length > 0 ? message.mentions.users.first() || await client.users.fetch(args[0]) || message.author : message.author

async function bannerXd(user, client) {
  const response = await axios.get(`https://discord.com/api/v9/users/${user}`, { headers: { 'Authorization': `Bot ${client.token}` } });
  if(!response.data.banner) return `https://media.discordapp.net/attachments/938786568175513660/972982817359274024/Banner_bulunmamakta.png`
  if(response.data.banner.startsWith('a_')) return `https://cdn.discordapp.com/banners/${response.data.id}/${response.data.banner}.gif?size=512`
  else return(`https://cdn.discordapp.com/banners/${response.data.id}/${response.data.banner}.png?size=512`)

}

let msg = await message.channel.send({ content: `${üye.displayAvatarURL({ dynamic: true, size: 4096 })}`, components: [row] })
var filter = (menu) => menu.user.id === message.author.id;
const collector = msg.createMessageComponentCollector({ filter, time: 30000 })

collector.on("collect", async (menu) => {
    if(menu.values[0] === "banner") {
        let banner = await bannerXd(üye.id, client)
        menu.reply({content: `${banner}`, ephemeral: true })
          }
})
},
  };