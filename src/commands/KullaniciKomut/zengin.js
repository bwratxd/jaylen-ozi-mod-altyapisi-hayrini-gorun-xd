const conf = require("../../configs/sunucuayar.json")
const { red, green} = require("../../configs/emojis.json")
module.exports = {
    conf: {
      aliases: ["zengin","booster"],
      name: "zengin",
      help: "zengin"
    },
  
run: async (client, message, args, embed, prefix) => {
    let booster = conf.boosterRolu || undefined;
    if(!booster) 
    {
    message.react(red)
    message.reply({ content:"Booster Rolu Bulunamadı!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if(!message.member.roles.cache.has(booster)) 
    {
    message.react(red)
    message.reply({ content:"Bu Komutu Kullanabilmek İçin Booster Rolüne Sahip Olmalısın!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    let uye = message.guild.members.cache.get(message.author.id);
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
    let yazilacakIsim;
    if(!isim) 
    {
    message.react(red)
    message.reply({ content:"Geçerli bir isim belirtmelisin!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    yazilacakIsim = `${uye.user.username.includes(conf.tag) ? conf.tag : (conf.ikinciTag ? conf.ikinciTag : (conf.tag || ""))} ${isim}`;
    uye.setNickname(`${yazilacakIsim}`).catch() 
    message.react(green)
    message.reply({ content:`Başarıyla ismini \`${yazilacakIsim}\` olarak değiştirdim!`}).then((e) => setTimeout(() => { e.delete(); }, 5000));
},
  };
  
  