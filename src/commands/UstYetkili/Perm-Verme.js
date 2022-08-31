const { MessageEmbed, Client, Message, MessageActionRow, MessageSelectMenu } = require("discord.js");
const { red, green } = require("../../configs/emojis.json")
let ayar = require("../../configs/sunucuayar.json"); 
let cfg = require("../../configs/settings.json"); 
const moment = require("moment");
require("moment-duration-format");
const client = global.bot;

module.exports = {
    conf: {
      aliases: ["perm"],
      name: "perm",
      help: "perm"
    },
  
    run: async (client, message, args, embed) => {
  if (!message.member.permissions.has("ADMINISTRATOR")) return message.react(red)

let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if (!uye) return message.reply({ content:` • Örnek; !perm @ozi/ID`});
if(message.author.id === uye.id) return message.reply({content: `Kendine Rol Veremezsin dostum!`, ephemeral: true })

const perm = new MessageActionRow()
.addComponents(
    new MessageSelectMenu()
        .setCustomId('perm')
        .setPlaceholder('Eklemek istediğiniz perm için tıklayınız')
        .addOptions([
            {
                label: 'Vip',
                value: 'vip',
                emoji: '970343074150621215'
            },
            {
                label: 'Müzisyen',
                value: 'müzisyen',
                emoji: '970343048162725928'
            },						
            {
                label: 'Tasarımcı',
                value: 'tasarımcı',
                emoji: '970343065820753940'
            },
            {
                label: 'Streamer',
                value: 'streamer',
                emoji: '970343083818508388'
            },
            {
                label: 'Sorun Çözücü',
                value: 'sorun',
                emoji: '970343056048005120'
            },
        ]),
);

const msg = await message.reply({ content : `${uye} kullanıcısına perm eklemek için aşağıdaki menüyü kullanınız`, components: [perm] });

const filter = i => i.user.id == message.author.id 
const collector = msg.createMessageComponentCollector({ filter, componentType: 'SELECT_MENU', max: 1, time: 20000 });
collector.on("collect", async (interaction) => {

     if (interaction.values[0] === "vip") {
        uye.roles.cache.has(ayar.vipRole) ? uye.roles.remove(ayar.vipRole) : uye.roles.add(ayar.vipRole);
        if(!uye.roles.cache.has(ayar.vipRole)) {
          client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Vip** adlı rol verildi.`)]})
          msg.edit({ content:`${green} Başarıyla ${uye}, isimli kişiye **Vip** rolü verildi.`, components: [] });
        } else {
          client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Vip** adlı rol geri alındı.`)]})
          msg.edit({ content:`${green} Başarıyla ${uye}, isimli kişinin **Vip** rolü geri alındı.`, components: [] });
        };
     }

     if (interaction.values[0] === "müzisyen") {
        uye.roles.cache.has(ayar.müzisyenRole) ? uye.roles.remove(ayar.müzisyenRole) : uye.roles.add(ayar.müzisyenRole);
        if(!uye.roles.cache.has(ayar.müzisyenRole)) {
          client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Müzisyen** adlı rol verildi.`)]})
          msg.edit({ content:`${green} Başarıyla ${uye}, isimli kişiye **Müzisyen** rolü verildi.`, components: [] });
        } else {
          client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Müzisyen** adlı rol geri alındı.`)]})
          msg.edit({ content:`${green} Başarıyla ${uye}, isimli kişinin **Müzisyen** rolü geri alındı.`, components: [] });
        };
     }

    if (interaction.values[0] === "tasarımcı") {
        uye.roles.cache.has(ayar.tasarımcıRole) ? uye.roles.remove(ayar.tasarımcıRole) : uye.roles.add(ayar.tasarımcıRole);
        if(!uye.roles.cache.has(ayar.tasarımcıRole)) {
          client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Tasarımcı** adlı rol verildi.`)]})
          msg.edit({ content:`${green} Başarıyla ${uye}, isimli kişiye **Tasarımcı** rolü verildi.`, components: [] });
        } else {
          client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Tasarımcı** adlı rol geri alındı.`)]})
          msg.edit({ content:`${green} Başarıyla ${uye}, isimli kişinin **Tasarımcı** rolü geri alındı.`, components: [] });
        };
     }

    if (interaction.values[0] === "streamer") {
        uye.roles.cache.has(ayar.streamerRole) ? uye.roles.remove(ayar.streamerRole) : uye.roles.add(ayar.streamerRole);
        if(!uye.roles.cache.has(ayar.streamerRole)) {
          client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Streamer** adlı rol verildi.`)]})
          msg.edit({ content:`${green} Başarıyla ${uye}, isimli kişiye **Streamer** rolü verildi.`, components: [] });
        } else {
          client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Streamer** adlı rol geri alındı.`)]})
          msg.edit({ content:`${green} Başarıyla ${uye}, isimli kişinin **Streamer** rolü geri alındı.`, components: [] });
        };
     }

    if (interaction.values[0] === "sorun") {
        uye.roles.cache.has(ayar.sorunçözücüRole) ? uye.roles.remove(ayar.sorunçözücüRole) : uye.roles.add(ayar.sorunçözücüRole);
        if(!uye.roles.cache.has(ayar.sorunçözücüRole)) {
          client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Sorun Çözücü** adlı rol verildi.`)]})
          msg.edit({ content:`${green} Başarıyla ${uye}, isimli kişiye **Sorun Çözücü** rolü verildi.`, components: [] });
        } else {
          client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Sorun Çözücü** adlı rol geri alındı.`)]})
          msg.edit({ content:`${green} Başarıyla ${uye}, isimli kişinin **Sorun Çözücü** rolü geri alındı.`, components: [] });
        };
     }
    })

}
}