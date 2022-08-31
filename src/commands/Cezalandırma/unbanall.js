const { Discord } = require("discord.js");
const penals = require("../../schemas/penals");
const conf = require("../../configs/sunucuayar.json")
const settings = require("../../configs/settings.json")
const { red, green, Cezaa, Revuu, revusome, kirmiziok } = require("../../configs/emojis.json")
const moment = require("moment");
moment.locale("tr");
const client = global.bot;

module.exports = {
  conf: {
    aliases: [],
    name: "unbanall",
    help: "unbanall",
    owner: true,
  },

  run: async (client, message, args, embed) => {
      
    message.guild.bans.fetch().then(banned => {
    let list = banned.map(user => `ID:                | Kullanıcı Adı:\n${user.user.id} | ${user.user.tag}`).join('\n');
    message.channel.send({ content:`\`\`\`js\n${list}\n\nSunucuda toplamda ${banned.size} yasaklı kullanıcının banı kaldırılıyor.\n\`\`\``})
    })
    message.react(green)

   const yarrak = await message.guild.bans.fetch();
   for(const sex of [...yarrak.values()]){
   const log = embed
   .setAuthor({ name: sex.user.username, iconURL:  sex.user.displayAvatarURL({ dynamic: true }) })
   .setColor("#2f3136")
   .setDescription(`
${Cezaa} Banı Kaldıran Üye: \`(${sex.user.username.replace(/\`/g, "")} - ${sex.user.id})\`
${kirmiziok} Banın Kaldırılma Tarihi: \`${moment(Date.now()).format("LLL")}\`
     `)
   message.guild.channels.cache.get(conf.banLogChannel).wsend({ embeds: [log]})

   await message.guild.members.unban(sex.user.id, `${message.author.username} tarafından kaldırıldı!`).catch(() => {});

   const data = await penals.findOne({ userID: sex.user.id, guildID: message.guild.id, type: "BAN", active: true });
   if (data) {
     data.active = false;
     await data.save();
   }
}
}}