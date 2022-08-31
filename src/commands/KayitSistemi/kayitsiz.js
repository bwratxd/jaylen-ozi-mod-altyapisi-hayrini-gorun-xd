const ayar = require("../../configs/sunucuayar.json")
const conf = require("../../configs/sunucuayar.json")
const { red, green } = require("../../configs/emojis.json")

module.exports = {
  conf: {
    aliases: ["kayıtsız","ks","kayitsiz"],
    name: "kayitsiz",
    help: "kayitsiz"
  },
  run: async (client, message, args, embed, prefix) => { 
    if(!ayar.teyitciRolleri.some(rol => message.member.roles.cache.has(rol)) && !message.member.permissions.has('ADMINISTRATOR')) 
    {
    message.react(red)
    message.reply({ content:`Yetkin bulunmamakta.\Yetkili olmak istersen başvurabilirsin.`}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) 
    {
    message.react(red)
    message.reply({ content:"Bir üye belirtmelisin!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if (!message.member.permissions.has(8n) && member.roles.highest.position >= message.member.roles.highest.position) 
    {
    message.react(red) 
    message.reply({ content:"Kendinle aynı yetkide ya da daha yetkili olan birini kayıtsıza atamazsın!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if (!member.manageable) 
    {
    message.react(red)
    message.reply({ content: "Bu üyeyi kayıtsıza atamıyorum!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    message.react(green)
    member.roles.set(conf.unregRoles);
    member.setNickname(`${ayar.ikinciTag} İsim ' Yaş`)
    message.reply({ content:`${member} üyesi, ${message.author} tarafından, kayıtsıza atıldı! ${green}`}).then((e) => setTimeout(() => { e.delete(); }, 5000));
  
  },
};