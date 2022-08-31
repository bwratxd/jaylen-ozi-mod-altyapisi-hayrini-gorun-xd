const coin = require("../../schemas/coin");
const moment = require("moment");
const ceza = require("../../schemas/ceza");
const cezapuan = require("../../schemas/cezapuan")
const banLimit = new Map();
moment.locale("tr");
const conf = require("../../configs/sunucuayar.json")
const settings = require("../../configs/settings.json")
const { red, green } = require("../../configs/emojis.json")

module.exports = {
  conf: {
    aliases: ["banlist","yargılist","banliste"],
    name: "banliste",
    help: "banliste"
  }, 

  run: async (client, message, args, embed) => {
    if (!message.member.permissions.has("BAN_MEMBERS") &&  !conf.banHammer.some(x => message.member.roles.cache.has(x))) { message.channel.send({ content:"Yeterli yetkin bulunmuyor!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
    message.react(red)
    return }
    const ban = await message.guild.bans.fetch();
    if (!ban) { message.channel.send({ content: "Banlı üye bulunmamaktır."}).then((e) => setTimeout(() => { e.delete(); }, 5000));
    message.react(red)
    return }
    message.guild.bans.fetch().then(banned => {
    let list = banned.map(user => `ID:                | Kullanıcı Adı:\n${user.user.id} | ${user.user.tag}`).join('\n');
    message.channel.send({ content:`\`\`\`js\n${list}\n\nSunucuda toplamda ${banned.size} yasaklı kullanıcı bulunmakta.\n\`\`\``})
    })
  },
};