const coin = require("../../schemas/coin");
const moment = require("moment");
const ceza = require("../../schemas/ceza");
const banLimit = new Map();
moment.locale("tr");
const penals = require("../../schemas/penals");
const conf = require("../../configs/sunucuayar.json")
const { red, green , Revuu} = require("../../configs/emojis.json")
const settings = require("../../configs/settings.json")
module.exports = {
  conf: {
    aliases: ["unvmute"],
    name: "unvmute",
    help: "unvmute"
  },

  run: async (client, message, args, embed) => {
    if (!message.member.permissions.has(8n) && !conf.vmuteHammer.some(x => message.member.roles.cache.has(x))) 
    {
    message.react(red)
    message.channel.send( { content:"Yeterli yetkin bulunmuyor!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); }
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) 
    {
    message.react(red)
    message.channel.send( { content:"Bir üye belirtmelisin!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); }
    if (!conf.voiceMute.some(x => member.roles.cache.has(x)) && (member.voice.channelId && !member.voice.serverMute)) 
    {
    message.react(red)
    message.channel.send( { content:"Bu üye muteli değil!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); }
    if (!message.member.permissions.has(8n) && member.roles.highest.position >= message.member.roles.highest.position) 
    {
    message.react(red)
    message.channel.send( { content:"Kendinle aynı yetkide ya da daha yetkili olan birinin susturmasını kaldıramazsın!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));}
    if (!member.manageable) 
    {
    message.react(red)
    message.channel.send( { content:"Bu üyenin susturmasını kaldıramıyorum!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); }

    message.react(green)
    member.roles.remove(conf.voiceMute);
    if (member.voice.channelId && member.voice.serverMute) member.voice.setMute(false);
    const data = await penals.findOne({ userID: member.user.id, guildID: message.guild.id, type: "VOICE-MUTE", active: true });
    if (data) {
      data.active = false;
      data.removed = true;
      await data.save();
    }
    message.reply({ content:`${green} ${member.toString()} üyesinin **sesli kanallarda** susturması, ${message.author} tarafından kaldırıldı!`}).then((e) => setTimeout(() => { e.delete(); }, 50000));
    if (settings.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından **sesli kanallarda** olan susturmanız kaldırıldı!`}).catch(() => {});

    const log = embed
    .setAuthor({ name: member.user.username, iconURL:  member.user.displayAvatarURL({ dynamic: true }) })
      .setColor("#2f3136")
      .setDescription(`
      ${member.toString()} Adlı Kişinin Ses Mutesi Kaldırıldı
      
${Revuu} Mute Kaldıran Kişi : ${message.author} (\`${message.author.id}\`)
          `)
          .setFooter({ text:`${moment(Date.now()).format("LLL")}` })
    message.guild.channels.cache.get(conf.vmuteLogChannel).wsend({ embeds: [log]});
  },
};


