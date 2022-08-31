const conf = require("../../configs/sunucuayar.json")
const ayar = require("../../configs/settings.json")
const moment = require("moment");
moment.locale("tr");
const { red } = require("../../configs/emojis.json")
let table = require("string-table");

module.exports = {
  conf: {
    aliases: ["ysay","yetkilises","sesteolmayan"],
    name: "ysay",
    help: "ysay"
  },

  run: async (client, message, args, embed, durum) => {

  if (!message.guild) return;
  if (!message.member.permissions.has(8n)) return message.react(red)

    const sec = args[0]
    if (!sec) {

      var ToplamYetkili = message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(ayar.registerPerm)).size
      var SesteOlanYetkili = message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(ayar.registerPerm)).filter(yetkilises => yetkilises.voice.channel).size
      var AktifYetkili = message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(ayar.registerPerm) && yetkili.presence && yetkili.presence.status !== "offline").size
      let SesteOlmayanYetkili = message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(ayar.registerPerm)).filter(yetkilises => !yetkilises.voice.channel && yetkilises.presence && yetkilises.presence.status != "offline").size

      let ozi = message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(ayar.registerPerm)).filter(yetkilises => !yetkilises.voice.channel  && yetkilises.presence && yetkilises.presence.status != "offline")

      let tablo = [{
        "TOPLAM": ToplamYetkili + " kişi",
        "AKTİF": AktifYetkili + " kişi",
        "SESTE": SesteOlanYetkili + " kişi",
        "SESTE OLMAYAN": SesteOlmayanYetkili + " kişi"
      }]

      message.channel.send({ content: `\`\`\`js\n${table.create(tablo)}\`\`\`\n\`\`\`\n${ozi.map(yetkili => `${yetkili}`).join(', ')}\n\`\`\``})
    }

    
}}