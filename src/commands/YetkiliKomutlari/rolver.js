const conf = require("../../configs/sunucuayar.json")
const { red, green } = require("../../configs/emojis.json")
module.exports = {
  conf: {
    aliases: ["rolver","rol-ver","r"],
    name: "rolver",
    help: "rolver"
  },

  run: async (client, message, args, embed) => {
    if(!conf.rolverici.some(oku => message.member.roles.cache.has(oku)) && !conf.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has('ADMINISTRATOR')) 
    {
    message.reply({ content:`Malesef yetkin bulunmamakta dostum.`}).then((e) => setTimeout(() => { e.delete(); }, 5000));
    return }

    if (!args[0]) return message.reply({ content:`${red} Kullanımı: !r al/ver Kullanıcı Rol`})
    if (args[0] != "al") {
        if (args[0] != "ver") {
            return message.reply({ content:`${red} Kullanımı: !r al/ver Kullanıcı Rol`})
        }
    }

    if (!args[1]) return message.reply({ content:`${red} Bir üye etiketle ve tekrardan dene!`})
    let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[1])
    if (!rMember) return message.reply({ content:`${red} Bir üye etiketle ve tekrardan dene!`})

    if (!args[2]) return message.reply({ content:`${red} Rolü belirtmelisin.`})
    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2])
        if (!role) return message.reply({ content:`${red} Belirtmiş olduğun rolü bulamadım ! Düzgün bir rol etiketle veya ID belirtip tekrar dene.`})
        if (message.member.roles.highest.rawPosition <= role.rawPosition) return message.reply({ content:`${red} Kendi rolünden yüksek veya eşit bir rolle işlem yapamazsın.`})
       

        if (args[0] == "al") {
          if (rMember.roles.cache.has(role.id)) {
            rMember.roles.remove(role.id)
            message.reply({ embeds: [embed.setThumbnail(message.author.avatarURL({dynamic: true, size: 2048})).setDescription(`${rMember} Kişisinden ${role} rolünü aldım.`)]})
          } else {
            message.reply({ embeds: [embed.setThumbnail(message.author.avatarURL({dynamic: true, size: 2048})).setDescription(`${rMember} Kişisinde ${role} rolü mevcut değil.`)]})
          }
      }
      if (args[0] == "ver") {
          if (!rMember.roles.cache.has(role.id)) {
            rMember.roles.add(role.id)
            message.reply({ embeds: [embed.setThumbnail(message.author.avatarURL({dynamic: true, size: 2048})).setDescription(`${rMember} Kişisine ${role} rolünü ekledim.`)]})
          } else {
            message.reply({ embeds: [embed.setThumbnail(message.author.avatarURL({dynamic: true, size: 2048})).setDescription(`${rMember} Kişisinde ${role} rolü zaten mevcut.`)]})
          }
      }
   },
 };
