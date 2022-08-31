const client = global.bot;
const cfg = require("../configs/settings.json");
const conf = require("../configs/sunucuayar.json");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const { Mute, Revuu, kirmiziok } = require("../configs/emojis.json")

module.exports = async (oldState, newState) => {
const channel = client.channels.cache.find(x => x.name == "voice_log");
if (!channel) return;

if (!oldState.channel && newState.channel) return channel.wsend({ content:`${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanala girdi!`});
if (oldState.channel && !newState.channel) return channel.wsend({ content:`${newState.member.displayName} üyesi \`${oldState.channel.name}\` adlı sesli kanaldan ayrıldı!`});
if (oldState.channel.id && newState.channel.id && oldState.channel.id != newState.channel.id) return channel.wsend({ content:`${newState.member.displayName} üyesi ses kanalını değiştirdi! (\`${oldState.channel.name}\` => \`${newState.channel.name}\`)`});
if (oldState.channel.id && oldState.selfMute && !newState.selfMute) return channel.wsend({ content:`${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda kendi susturmasını kaldırdı!`});
if (oldState.channel.id && !oldState.selfMute && newState.selfMute) return channel.wsend({ content:`${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda kendini susturdu!`});
if (oldState.channel.id && oldState.selfDeaf && !newState.selfDeaf) return channel.wsend({ content:`${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda kendi sağırlaştırmasını kaldırdı!`});
if (oldState.channel.id && !oldState.selfDeaf && newState.selfDeaf) return channel.wsend({ content:`${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda kendini sağırlaştırdı!`});
if (oldState.channel.id && !oldState.streaming && newState.channel.id && newState.streaming) return channel.wsend({ content:`${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda yayın açtı!`});
if (oldState.channel.id && oldState.streaming && newState.channel.id && !newState.streaming) return channel.wsend({ content:`${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda yayını kapattı!`});
if (oldState.channel.id && !oldState.selfVideo && newState.channel.id && newState.selfVideo) return channel.wsend({ content:`${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda kamerasını açtı!`});
if (oldState.channel.id && oldState.selfVideo && newState.channel.id && !newState.selfVideo) return channel.wsend({ content:`${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda kamerasını kapattı!`});

const channel2 = oldState.guild.channels.cache.get(conf.vmuteLogChannel);
if (!channel2) return;
let logs = await oldState.guild.fetchAuditLogs({ limit: 1, type: "MEMBER_UPDATE" });
let entry = logs.entries.first();
if (!oldState.serverMute && newState.serverMute) return channel2.wsend({ embeds: [new MessageEmbed().setColor("RANDOM").setAuthor({ name: client.guilds.cache.get(cfg.guildID).name, iconURL: client.guilds.cache.get(cfg.guildID).iconURL({dynamic:true})}).setFooter({ text: `${moment(Date.now()).format("LLL")}`}).setDescription(`
${newState.member} Adlı Kişiye Sağ-tık susturma işlemi yapıldı.

${Mute} Mute Atılan Kişi : ${newState.member} (\`${newState.member.id}\`)
${Revuu} Mute Atan Yetkili : ${entry.executor} (\`${entry.executor.id}\`)
${kirmiziok} Mute Atılan Ses Kanal: <#${newState.channel.id}>`)]});
};

module.exports.conf = {
  name: "voiceStateUpdate",
};