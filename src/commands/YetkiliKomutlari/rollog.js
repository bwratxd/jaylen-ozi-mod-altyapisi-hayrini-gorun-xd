const { MessageEmbed, Discord, MessageActionRow, MessageButton } = require('discord.js');
const {red, green} = require("../../configs/emojis.json")
const roller = require("../../schemas/rolveridb");
const emojis = require("../../configs/emojis.json");
const moment = require("moment");
moment.locale("tr");

module.exports = {
  conf: {
aliases: ["rollog"],
name: "rollog",
help: "rollog"
  },

  run: async (client, message, args, embed) => {

    const row = new MessageActionRow()
    .addComponents(

new MessageButton()
.setCustomId("önce")
.setLabel("Önceki Sayfa")
.setStyle("SUCCESS")
.setEmoji("⏮️"),

new MessageButton()
.setCustomId("kapat")
.setLabel("Sayfaları Kapat")
.setStyle("DANGER")
.setEmoji("❌"),

new MessageButton()
.setCustomId("sonra")
.setLabel("Sonraki Sayfa")
.setStyle("SUCCESS")
.setEmoji("⏭️"),

);

        if (!message.member.permissions.has("VIEW_AUDIT_LOG")) return;
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        const Veri = await roller.findOne({ user: Member.id });
        if (!Veri) return message.reply({ content: "<@" + Member.id + "> kişisinin rol bilgisi veritabanında bulunmadı."})
        let page = 1;
        let rol = Veri.roller.sort((a, b) => b.tarih - a.tarih)
        let liste = rol.map(x => `\`[${x.tarih}\`, **[${x.state == "Ekleme" ? "EKLEME" : "KALDIRMA" }]**] <@${x.mod}>: <@&${x.rol}>`)
        var msg = await message.channel.send({ embeds: [new MessageEmbed().setDescription(`${liste.slice(page == 1 ? 0 : page * 10 - 10, page * 10).join('\n')}`).setTimestamp().setAuthor({ name: Member.user.tag, iconURL: Member.user.avatarURL({ dynamic: true  })})], components: [row]});


        var filter = (button) => button.user.id === message.author.id;
        let collector = await msg.createMessageComponentCollector({ filter, time: 60000 })
       
        collector.on("collect", async (button) => {
              
        if (liste.length > 10) {

       if(button.customId === "önce") {
        await button.deferUpdate();

                    if (liste.slice((page + 1) * 10 - 10, (page + 1) * 10).length <= 0) return;
                    page += 1;
                    let rollogVeri = liste.slice(page == 1 ? 0 : page * 10 - 10, page * 10).join("\n");
                    msg.edit({ embeds: [new MessageEmbed().setColor("RANDOM").setDescription(`${rollogVeri}`).setTimestamp().setAuthor({ name: Member.user.tag, iconURL: Member.user.avatarURL({ dynamic: true  })})]});
                }
        
       if(button.customId === "sonra") {
        await button.deferUpdate();

                    if (liste.slice((page - 1) * 10 - 10, (page - 1) * 10).length <= 0) return;
                    page -= 1;
                    let rollogVeri = liste.slice(page == 1 ? 0 : page * 10 - 10, page * 10).join("\n");
                    msg.edit({ embeds: [new MessageEmbed().setColor("RANDOM").setDescription(`${rollogVeri}`).setTimestamp().setAuthor({ name: Member.user.tag, iconURL: Member.user.avatarURL({ dynamic: true  })})]});
                }
       
       if(button.customId === "kapat") {
        await button.deferUpdate();

        row.components[0].setDisabled(true) 
        row.components[1].setDisabled(true) 
        row.components[2].setDisabled(true) 
        msg.edit({ components: [row] }); 
        button.reply("İşlem iptal edildi.")
                }
            }
          })
  },
};