const moment = require("moment");
moment.locale("tr");
const penals = require("../../schemas/penals");
const conf = require("../../configs/sunucuayar.json")
const settings = require("../../configs/settings.json")
const { red, green, Revuu} = require("../../configs/emojis.json")
module.exports = {
  conf: {
    aliases: ["unjail"],
    name: "unjail",
    help: "unjail"
  },

  run: async (client, message,  args, embed) => {
    if (!message.member.permissions.has(8n) && !conf.jailHammer.some(x => message.member.roles.cache.has(x))) 
    {
    message.react(red)
    message.channel.send({ content:"Yeterli yetkin bulunmuyor!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) {
    message.react(red)
    message.channel.send({ content:"Bir üye belirtmelisin!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if (!conf.jailRole.some(x => member.roles.cache.has(x))) 
    {
    message.react(red)
    message.channel.send({ content:"Bu üye jailde değil!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if (!message.member.permissions.has(8n) && member.roles.highest.position >= message.member.roles.highest.position) 
    {
    message.react(red)
    message.channel.send({ content:"Kendinle aynı yetkide ya da daha yetkili olan birinin jailini kaldıramazsın!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if (!member.manageable) {
    message.react(red)  
    message.channel.send({ content:"Bu üyeyi jailden çıkaramıyorum!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }

    member.roles.cache.has(conf.boosterRolu) ? member.roles.set([conf.boosterRolu, conf.unregRoles[0]]) : member.roles.set(conf.unregRoles)
    const data = await penals.findOne({ userID: member.user.id, guildID: message.guild.id, $or: [{ type: "JAIL" }, { type: "TEMP-JAIL" }], active: true });
    if (data) {
      data.active = false;
      await data.save();
    }
    message.react(green)
    message.reply({ content:`${green} ${member.toString()} üyesinin jaili ${message.author} tarafından kaldırıldı!`}).then((e) => setTimeout(() => { e.delete(); }, 50000));
    if (settings.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, jailiniz kaldırıldı!`}).catch(() => {});

    const log = embed
    .setAuthor({ name: member.user.username, iconURL:  member.user.displayAvatarURL({ dynamic: true }) })
      .setColor("#2f3136")
      .setDescription(`
      ${member.toString()} Adlı Kişinin Jaili Kaldırıldı
      
${Revuu} Jaili Kaldıran Kişi : ${message.author} (\`${message.author.id}\`)
          `)
          .setFooter({ text:`${moment(Date.now()).format("LLL")}` })
          message.guild.channels.cache.get(conf.jailLogChannel).wsend({ embeds: [log]});
  },
};

