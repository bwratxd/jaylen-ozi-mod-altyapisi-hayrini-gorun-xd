const Discord = require("discord.js")
const { green, red } = require("../../configs/emojis.json")
const conf = require("../../configs/sunucuayar.json")
module.exports = {
    conf: {
      aliases: ["tagsay"],
      name: "tagsay",
      help: "tagsay"
    },
  
    run: async (client, message, args, embed) => {
        if (!message.member.permissions.has("ADMINISTRATOR")) { message.channel.send({ content:"Yeterli yetkin bulunmuyor!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
        message.react(red)
        return }
        const tag = args.slice(0).join(" ") || conf.tag;
        let page = 1;
        const memberss = message.guild.members.cache.filter((member) => member.user.username.includes(tag) && !member.user.bot);
        let liste = memberss.map((member) => `${member} - \`${member.id}\``) || `**${tag}** taglı kullanıcı yok`
        var msg = await message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(`Kullanıcı adında **${tag}** tagı olan **${memberss.size}** kişi bulunuyor:\n\n ${liste.slice(page == 1 ? 0 : page * 40 - 40, page * 40).join('\n')}`).setColor("RANDOM")]});
        if (liste.length > 40) {
            await msg.react(`⬅️`);
            await msg.react(`➡️`);
            let collector = msg.createReactionCollector((react, user) => ["⬅️", "➡️"].some(e => e == react.emoji.name) && user.id == message.member.id, { time: 200000 });
            collector.on("collect", (react) => {
                if (react.emoji.name == "➡️") {
                    if (liste.slice((page + 1) * 40 - 40, (page + 1) * 40).length <= 0) return;
                    page += 1;
                    let tagsay = liste.slice(page == 1 ? 0 : page * 40 - 40, page * 40).join("\n");
                    msg.edit({embeds: [new Discord.MessageEmbed().setColor("RANDOM").setDescription(`Kullanıcı adında **${tag}** tagı olan **${memberss.size}** kişi bulunuyor:\n\n${tagsay}`).setColor("RANDOM")]});
                    react.users.remove(message.author.id)
                }
                if (react.emoji.name == "⬅️") {
                    if (liste.slice((page - 1) * 40 - 40, (page - 1) * 40).length <= 0) return;
                    page -= 1;
                    let tagsay = liste.slice(page == 1 ? 0 : page * 40 - 40, page * 40).join("\n");
                    msg.edit({embeds: [new Discord.MessageEmbed().setColor("RANDOM").setDescription(`Kullanıcı adında **${tag}** tagı olan **${memberss.size}** kişi bulunuyor:\n\n${tagsay}`).setColor("RANDOM")]});
                    react.users.remove(message.author.id)
                }
            })
        }
      },
    };
