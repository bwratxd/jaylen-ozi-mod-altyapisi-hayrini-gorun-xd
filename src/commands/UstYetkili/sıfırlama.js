const moment = require("moment");
const cezapuans = require("../../schemas/cezapuan");
const ceza = require("../../schemas/ceza")
const name = require("../../schemas/names");
const penals = require("../../schemas/penals");
require("moment-duration-format");
const conf = require("../../configs/sunucuayar.json");
const { kirmiziok, green, red ,star } = require("../../configs/emojis.json");
const { TeamMember, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  conf: {
    aliases: ["sf","sıfırla"],
    name: "sıfırla",
    help: "sıfırla"
  },

  run: async (client, message, args, embed) => {
if (!message.member.permissions.has('ADMINISTRATOR'))
{
message.reply({ content:"Bu işlemi yapamazsın dostum!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
message.react(red)
return;
}
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
     
    var DeleteName = new MessageButton()
    .setLabel("İsim Sıfırla")
    .setCustomId("isim_sıfırla")
    .setStyle("PRIMARY")

    var DeletePenalty = new MessageButton()
    .setLabel("Ceza Puan Sıfırla")
    .setCustomId("cezapuan_sıfırla")
    .setStyle("SUCCESS")

    var DeletePenal = new MessageButton()
    .setLabel("Sicil Sıfırla")
    .setCustomId("sicil_sıfırla")
    .setStyle("DANGER")

    var Iptal = new MessageButton()
    .setLabel("İptal")
    .setCustomId("iptal_button")
    .setStyle("SECONDARY")
    .setEmoji("909485171240218634")

    const row = new MessageActionRow()
    .addComponents([DeleteName, DeletePenalty, DeletePenal, Iptal])


embed.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) }).setTimestamp().setColor(message.author.displayHexColor).setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })}).setThumbnail(message.guild.iconURL({ dynamic: true }))
embed.addField(`VERİ SIFIRLAMA PANELİ`,`
\` ❯ \` İsim Sıfırlama
\` ❯ \` Ceza Puan Sıfırlama
\` ❯ \` Sicil Sıfırlama

${member.toString()} üyesine ait sıfırlamak istediğin veriyi aşağıdaki butonlar yardımıyla sıfırlayabilirsiniz.
`)

    let msg = await message.channel.send({ embeds: [embed], components: [row] });
    var filter = (button) => button.user.id === message.author.id;
   
    let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })
    collector.on("collect", async (button) => {

      if(button.customId === "isim_sıfırla") {
        await button.deferUpdate();
        await name.deleteMany({userID: member.user.id, guildID: message.guild.id})
      const isim = new MessageEmbed()
      .setDescription(`${green} ${member.toString()} üyesinin isim geçmişi ${message.author} tarafından \`${moment(Date.now()).format("LLL")}\` tarihinde temizlendi!`)

msg.edit({
  embeds : [isim],
  components : []
})
      
      }

  if(button.customId === "cezapuan_sıfırla") {
    await button.deferUpdate();
    await cezapuans.deleteMany({userID: member.user.id, guildID: message.guild.id})
    await ceza.deleteMany({userID: member.user.id, guildID: message.guild.id})
    const cezapuan = new MessageEmbed()
    .setDescription(`${green}  ${member.toString()} üyesinin ceza puanı ${message.author} tarafından \`${moment(Date.now()).format("LLL")}\` tarihinde temizlendi!`) 


msg.edit({
  embeds: [cezapuan],
  components : []
})  
    }
 if(button.customId === "sicil_sıfırla") {   
    await button.deferUpdate();
    await penals.deleteMany({userID: member.user.id, guildID: message.guild.id})
    const sicil = new MessageEmbed()
    .setDescription(`${green}  ${member.toString()} üyesinin sicili ${message.author} tarafından \`${moment(Date.now()).format("LLL")}\` tarihinde temizlendi!`) 

msg.edit({
  embeds: [sicil],
  components : []
})  
    }

 if(button.customId === "iptal_button") {   
    await button.deferUpdate();
    const iptal = new MessageEmbed()
    .setDescription(`${green} Sıfırlama işlemi iptal edildi`) 

msg.edit({
  embeds: [iptal],
  components : []
})  
    }


  })
  }
};
