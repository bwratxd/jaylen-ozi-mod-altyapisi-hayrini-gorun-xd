const { MessageEmbed } = require("discord.js");
const client = global.bot;
const bannedTag = require("../schemas/bannedTag");
const conf = require("../configs/sunucuayar.json");
const settings = require("../configs/settings.json")
const regstats = require("../schemas/registerStats");

module.exports = async (oldUser, newUser) => {
    if (oldUser.bot || newUser.bot || (oldUser.username === newUser.username)) return;
    const guild = client.guilds.cache.get(settings.guildID);
    if (!guild) return;
    const member = guild.members.cache.get(oldUser.id);
    if (!member) return;
    const channel = client.channels.cache.find(x => x.name == "taglı_log");
    const kanal = guild.channels.cache.get(conf.chatChannel)
    if (oldUser.username.includes(conf.tag) && !newUser.username.includes(conf.tag)) {
   const tagModedata = await regstats.findOne({ guildID: settings.guildID })
    if (tagModedata && tagModedata.tagMode === true) {
   if(!member.roles.cache.has(conf.vipRole) && !member.roles.cache.has(conf.boosterRolu)) return member.roles.set(conf.unregRoles);
  } else if (conf.ekipRolu) {
  let ekip = guild.roles.cache.get(conf.ekipRolu);
  if (member.roles.cache.has(ekip)) member.roles.remove(ekip).catch();
  let roles = member.roles.cache.clone().filter(e => e.managed || e.rawPosition < ekip.rawPosition);
  member.roles.set(roles).catch();
  }

      if (!channel) return;
      const embed = new MessageEmbed()
        .setAuthor({ name: member.displayName, iconURL: newUser.displayAvatarURL({ dynamic: true })})
        .setTitle("• Bir kullanıcı tag saldı!")
        .setColor("#2f3136")
        .setDescription(`
${member.toString()} kullanıcısı ${conf.tag} tagını saldığı için <@&${conf.ekipRolu}> rolü alındı.
Aktif taglı sayısı: ${guild.members.cache.filter(x => x.user.username.includes(conf.tag)).size}
         `);
      channel.wsend({ embeds: [embed]});
      } else if (!oldUser.username.includes(conf.tag) && newUser.username.includes(conf.tag)){
      member.roles.add(conf.ekipRolu);
      if (!channel) return;
      const embed = new MessageEmbed()
      .setAuthor({ name: member.displayName, iconURL: newUser.displayAvatarURL({ dynamic: true })})
      .setTitle("• Bir kullanıcı tag aldı!")
        .setColor("#2f3136")
        .setDescription(`
${member.toString()} kullanıcısı ${conf.tag} tagını aldığı için <@&${conf.ekipRolu}> rolü verildi.
Aktif taglı sayısı: ${guild.members.cache.filter(x => x.user.username.includes(conf.tag)).size}
    `);
      channel.wsend({ embeds: [embed]});
      kanal.wsend({ embeds: [new MessageEmbed().setColor("#2f3136").setDescription(`${member.toString()} üyesi ${conf.tag} tagımızı alarak ailemize katıldı! Ailemiz ${guild.members.cache.filter(x => x.user.username.includes(conf.tag)).size} kişi oldu!`)]}).then((e) => setTimeout(() => { e.delete(); }, 5000));

    }
  
    const res = await bannedTag.findOne({ guildID: settings.guildID });
    if (!res) return
    res.taglar.forEach(async x => {
      
    if (!oldUser.tag.includes(x) && newUser.tag.includes(x)) {
        !member.roles.cache.has(conf.boosterRolu) 
        await member.roles.set(conf.jailRole).catch();
        await member.setNickname('Yasaklı Tag');
       member.send({ content:`${guild.name} adlı sunucumuza olan erişiminiz engellendi! Sunucumuzda yasaklı olan bir simgeyi (${x}) isminizde taşımanızdan dolayıdır. Sunucuya erişim sağlamak için simgeyi (${x}) isminizden çıkartmanız gerekmektedir.\n\nSimgeyi (${x}) isminizden kaldırmanıza rağmen üstünüzde halen Yasaklı Tag rolü varsa sunucudan gir çık yapabilirsiniz veya sağ tarafta bulunan yetkililer ile iletişim kurabilirsiniz. **-Yönetim**\n\n__Sunucu Tagımız__\n**${conf.tag}**`})
      } else
      if (oldUser.tag.includes(x) && !newUser.tag.includes(x)) { 
        !member.roles.cache.has(conf.boosterRolu) 
        await member.roles.set(conf.unregRoles).catch();
        await member.setNickname(`${conf.ikinciTag} İsim ' Yaş`);
      member.send({ content:`${guild.name} adlı sunucumuza olan erişim engeliniz kalktı. İsminizden (${x}) sembolünü kaldırarak sunucumuza erişim hakkı kazandınız. Keyifli Sohbetler**-Yönetim**`})
      }
    })

};

module.exports.conf = {
  name: "userUpdate",
};
