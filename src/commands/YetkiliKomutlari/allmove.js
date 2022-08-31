const { MessageFlags } = require("discord.js");
const {red, green} = require("../../configs/emojis.json")
module.exports = {
  conf: {
    aliases: ["toplutaşı","allmove"],
    name: "toplutaşı",
    help: "toplutaşı"
  },

  run: async (client, message, args, embed) => {
    if (!message.guild) return;
    
    if (message.member.permissions.has(8n)) {
        let kanal_1 = message.guild.channels.cache.get(args[0]);
        let kanal_2 = message.guild.channels.cache.get(args[1]);
        if (kanal_1 && kanal_2) {
        [...kanal_1.members.values()].forEach((member,index) => {
        setTimeout(async () => {
        await member.voice.setChannel(kanal_2)
        },index*1500)
        })
        message.channel.send({ content: `**${kanal_1.members.size}** adet üyeyi başarılı bir şekilde ${kanal_2} kanalına taşıdınız!`})
        } else return message.reply({ content:`Doğru kullanım: \`!toplutaşı <taşınacak-kanal> <taşıyacağınız-kanal>\``});
    }
  },
};
