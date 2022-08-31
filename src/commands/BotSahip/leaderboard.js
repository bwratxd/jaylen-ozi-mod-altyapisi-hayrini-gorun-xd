const { MessageEmbed } = require("discord.js");
const cfg = require("../../configs/settings.json")
const messageUser = require("../../schemas/messageUser");
const voiceUser = require("../../schemas/voiceUser");
const sex = require("../../schemas/leaderboard");
const moment = require("moment");
const client = global.bot;

module.exports = {
  conf: {
    aliases: [],
    name: "leaderboard",
    owner: true,
  },

  run: async (client, message, args) => {

    const messageUsersData = await messageUser.find({ guildID: cfg.guildID }).sort({ topStat: -1 });
    const messageUsers = messageUsersData.splice(0, 10).map((x, index) => `\` ${index+1} \` <@${x.userID}>: \`${Number(x.topStat).toLocaleString()} mesaj\``).join(`\n`);
    const voiceUsersData = await voiceUser.find({ guildID: cfg.guildID }).sort({ topStat: -1 });
    const voiceUsers = voiceUsersData.splice(0, 10).map((x, index) => `\` ${index+1} \` <@${x.userID}>: \`${moment.duration(x.topStat).format("H [saat], m [dakika]")}\``).join(`\n`);

    const sunucuisim = client.guilds.cache.get(cfg.guildID).name
    let LeaderBoard = await client.channels.cache.find(x => x.name == "leaderboard")
  
    const msgList = (`${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}`)
    const voiceList = (`${voiceUsers.length > 0 ? voiceUsers : "Veri Bulunmuyor."}`)


   let Chat = new MessageEmbed()
   .setColor("BLACK")
   .setAuthor({ name: client.guilds.cache.get(cfg.guildID).name, iconURL: client.guilds.cache.get(cfg.guildID).iconURL({dynamic:true})})
   .setDescription(`🎉 Aşağı da \`${sunucuisim}\` sunucusunun genel mesaj sıralaması listelenmektedir.\n\n${msgList}\n\nGüncellenme Tarihi: <t:${Math.floor(Date.now() / 1000)}:R>`)
   LeaderBoard.send({ embeds: [Chat]}).then(async (tmsg) => {
    await sex.findOneAndUpdate({ guildID: message.guild.id }, { $set: { messageListID: tmsg.id } }, { new: true });
  })

   let Voice = new MessageEmbed()
   .setColor("BLACK")
   .setAuthor({ name: client.guilds.cache.get(cfg.guildID).name, iconURL: client.guilds.cache.get(cfg.guildID).iconURL({dynamic:true})})
   .setDescription(`🎉 Aşağı da \`${sunucuisim}\` sunucusunun genel ses sıralaması listelenmektedir.\n\n${voiceList}\n\nGüncellenme Tarihi: <t:${Math.floor(Date.now() / 1000)}:R>`)
   LeaderBoard.send({ embeds: [Voice]}).then(async (vmsg) => {
    await sex.findOneAndUpdate({ guildID: message.guild.id }, { $set: { voiceListID: vmsg.id } }, { upsert: true });
  }).then(async () => {
    await process.exit(0)
  })

  },
};