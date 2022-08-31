const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const coin = require("../../schemas/coin");
const taggeds = require("../../schemas/taggeds");
const tagli = require("../../schemas/taggorev");
const conf = require("../../configs/sunucuayar.json")
const settings = require("../../configs/settings.json")
const { red, green} = require("../../configs/emojis.json")
module.exports = {
  conf: {
    aliases: ["tag-aldır", "taglıaldır", "taglı"],
    name: "tagaldır",
    help: "tagaldır [kullanıcı]"
  },

  run: async (client, message, args, embed) => {
    if (!conf.staffs.some(x => message.member.roles.cache.has(x))) return message.react(red)
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) 
    {
    message.react(red)
    message.channel.send({ content:"Bir üye belirtmelisin!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if (!member.user.username.includes(conf.tag)) 
    { 
    message.react(red)
    message.channel.send({ content:"Bu üye taglı değil!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    const taggedData = await taggeds.findOne({ guildID: message.guild.id, userID: message.author.id });
    if (taggedData && taggedData.taggeds.includes(member.user.id)) 
    {
    message.react(red)
    message.channel.send({ content:"Bu üyeye zaten daha önce tag aldırmışsın!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }

    const row = new MessageActionRow()
    .addComponents(
  
    new MessageButton()
    .setCustomId("onay")
    .setLabel("Kabul Et")
    .setStyle("SUCCESS")
    .setEmoji("915754671728132126"),
  
    new MessageButton()
    .setCustomId("red")
    .setLabel("Reddet")
    .setStyle("DANGER")
    .setEmoji("920412153712889877"),
    );
  
  
    const row2 = new MessageActionRow()
    .addComponents(
    new MessageButton()
    .setCustomId("onayy")
    .setLabel("İşlem Başarılı")
    .setStyle("SUCCESS")
    .setDisabled(true),
    );

    const row3 = new MessageActionRow()
    .addComponents(
    new MessageButton()
    .setCustomId("redd")
    .setLabel("İşlem Başarısız")
    .setStyle("DANGER")
    .setDisabled(true),
    );

    const taglıembed = new MessageEmbed() 
    .setAuthor({ name: member.displayName, iconURL: member.user.avatarURL({ dynamic: true })})
    .setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })})
    .setFooter({ text: `60 saniye içerisinde butonlara basılmazsa işlem iptal edilecektir.`, iconURL: message.author.avatarURL({ dynamic: true })})
    .setDescription(`${member.toString()}, ${message.member.toString()} üyesi sana tag aldırmak istiyor. Kabul ediyor musun?`)

    const msg = await message.reply({ content: `${member.toString()}`, embeds: [taglıembed], components: [row]});


var filter = button => button.user.id === member.user.id;

let collector = await msg.createMessageComponentCollector({ filter, time: 60000 })

    collector.on("collect", async (button) => {

      if(button.customId === "onay") {
        await button.deferUpdate();
      
      const embeds = new MessageEmbed() 
      .setAuthor({ name: member.displayName, iconURL: member.user.avatarURL({ dynamic: true })})
      .setTimestamp()
      .setDescription(`${message.author}, ${member.toString()} Adlı kullanıcı senin taglı aldırma isteğini onayladı. ${green}`)
            
      await coin.findOneAndUpdate({ guildID: member.guild.id, userID: message.author.id }, { $inc: { coin: settings.taggedCoin } }, { upsert: true });
      const tagData = await tagli.findOne({ guildID: message.guild.id, userID: message.author.id });
      if (tagData)
      {
      await tagli.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { tagli: 1 } }, { upsert: true });
      }
      await taggeds.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $push: { taggeds: member.user.id } }, { upsert: true });

      msg.edit({
      embeds: [embeds],
      components : [row2]
      })
      
      }
      
      if(button.customId === "red") {
        await button.deferUpdate();
      
      const embedss = new MessageEmbed() 
      .setAuthor({ name: member.displayName, iconURL: member.user.avatarURL({ dynamic: true })})
      .setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })})
      .setTimestamp()
      .setDescription(`${message.author}, ${member} Adlı kullanıcı senin taglı aldırma isteğini onaylamadı. ${red}`)
      
      msg.edit({
        embeds: [embedss],
        components : [row3]
      })
          }
       });

  }
}