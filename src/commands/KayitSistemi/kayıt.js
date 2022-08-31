const { MessageEmbed, Client, MessageActionRow, MessageButton } = require('discord.js');
const coin = require("../../schemas/coin");
const conf = require("../../configs/sunucuayar.json")
const ayar = require("../../configs/sunucuayar.json")
const toplams = require("../../schemas/toplams");
const Ayarlar = require("../../configs/sunucuayar.json");
const kayitg = require("../../schemas/kayitgorev");
const settings = require("../../configs/settings.json")
const { red , green } = require("../../configs/emojis.json")
const isimler = require("../../schemas/names");
const regstats = require("../../schemas/registerStats");
const otokayit = require("../../schemas/otokayit");
const moment = require("moment")
moment.locale("tr")

const client = global.bot;

module.exports = {
  conf: {
    aliases: ["kayit", "kayıt", "kadın", "Kadın", "k", "kadin", "Kadin", "Woman", "kız", "Kız", "erkek", "Erkek", "e", "ERKEK", "Man", "man"],
    name: "kayıt",
    help: "kayıt [üye] [isim] [yaş]"
  },
run: async (client, message, args, embed, prefix) => { 
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!Ayarlar.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !Ayarlar.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has('ADMINISTRATOR')) 
    {
    message.react(red)
    message.reply({ content:`Yetkin bulunmamakta dostum.\Yetkili olmak istersen başvurabilirsin.`}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if(!uye) 
    {
    message.react(red)
    message.reply({ content:`\`${prefix}kayıt <@ozi/ID> <Isim> <Yaş>\``}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if(message.author.id === uye.id) 
    {
    message.react(red)
    message.reply({ content:`Kendini kayıt edemezsin.`}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if(!uye.manageable) 
    {
    message.react(red)
    message.reply({ content:`Böyle birisini kayıt edemiyorum.`}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if(message.member.roles.highest.position <= uye.roles.highest.position) 
    {
    message.react(red)
    message.reply({ content:`Senden yüksekte olan birisini kayıt edemezsin.`}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    const data = await isimler.findOne({ guildID: message.guild.id, userID: uye.user.id });
    args = args.filter(a => a !== "" && a !== " ").splice(1);
    let setName;
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
    let yaş = args.filter(arg => !isNaN(arg))[0] || "";
    if(!isim && !yaş) 
    {
    message.react(red)
    message.reply({ content:`\`${prefix}kayıt <@ozi/ID> <Isim> <Yaş>\``}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }

   const tagModedata = await regstats.findOne({ guildID: message.guild.id })
    if (tagModedata && tagModedata.tagMode === true) {
    if(!uye.user.username.includes(ayar.tag) && !uye.roles.cache.has(ayar.vipRole) && !uye.roles.cache.has(ayar.boosterRolu)) return message.reply({ embeds: [embed.setDescription(`${uye.toString()} isimli üyenin kullanıcı adında tagımız (\` ${ayar.tag} \`) olmadığı, <@&${ayar.boosterRolu}>, <@&${ayar.vipRole}> Rolü olmadığı için isim değiştirmekden başka kayıt işlemi yapamazsınız.`)] });
    }

    if(!yaş) 
    { setName =`${ayar.tag} ${isim}`;
    } else { setName = `${ayar.tag} ${isim} ' ${yaş}`;
  }

    uye.setNickname(`${setName}`).catch(err => message.reply({ content:`İsim çok uzun.`}))
    const datas = await regstats.findOne({ guildID: message.guild.id, userID: message.member.id });

    if(!uye.roles.cache.has(Ayarlar.erkekRolleri) && !uye.roles.cache.has(Ayarlar.kizRolleri)) {

    const row = new MessageActionRow()
		.addComponents(

    new MessageButton()
    .setCustomId("MAN")
    .setLabel("Erkek")
    .setStyle("PRIMARY")
    .setEmoji("916010225289560074"),

    new MessageButton()
    .setCustomId("WOMAN")
    .setLabel("Kadın")
    .setStyle("SUCCESS")
    .setEmoji("916010235200679996"),

    new MessageButton()
    .setCustomId("İPTAL")
    .setLabel("İptal")
    .setStyle("DANGER")
    .setEmoji("920412153712889877"),

	);

    let erkekRol = conf.erkekRolleri;
    let kadinRol = conf.kizRolleri;

    const data = await isimler.findOne({ guildID: message.guild.id, userID: uye.user.id });

    message.react(green)
let ozi = new MessageEmbed()
.setDescription(`
${uye.toString()} üyesinin ismi "${setName}" olarak değiştirildi, bu üye daha önce bu isimlerle kayıt olmuş.

${red} üyesinin toplamda **${data ? `${data.names.length}` : "0"}** isim kayıtı bulundu
${data ? data.names.splice(0, 3).map((x, i) => `\`${x.name}\` (${x.rol}) (<@${x.yetkili}>)`).join("\n") : "Daha önce kayıt olmamış."}

Üyesinin önceki isimlerine \`.isimler <@ozi/ID>\` komutuyla bakarak kayıt işlemini gerçekleştirmeniz önerilir.
    `)
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
.setFooter({ text: `Lütfen 30 saniye alttaki butonlara basarak kullanıcının cinsiyetini belirleyin.` })

 let msg = await message.channel.send({ embeds: [ozi], components : [row] })
 
 var filter = (button) => button.user.id === message.author.id;
 let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })

      collector.on("collect", async (button) => {

if(button.customId === "MAN") {

  let ozie = new MessageEmbed()
  .setDescription(`
  ${uye.toString()} sunucumuza <@${message.author.id}> tarafından, \`${setName}\` ismiyle ${conf.erkekRolleri.length > 1 ? conf.erkekRolleri.slice(0, -1).map(x => `<@&${x}>`).join(", ") + " ve " + conf.erkekRolleri.map(x => `<@&${x}>`).slice(-1) : conf.erkekRolleri.map(x => `<@&${x}>`).join("")} rolleri verilerek kayıt edildi!     
  `)
  .setAuthor({ name: uye.displayName, iconURL: uye.user.displayAvatarURL({ dynamic: true }) })
  .setThumbnail(uye.user.displayAvatarURL({ dynamic: true, size: 2048 }))
  .setFooter({ text:`• Toplam kayıt: ${datas ? datas.top : 0} • Erkek kayıt : ${datas ? datas.erkek : 0} • Kadın kayıt : ${datas ? datas.kız : 0} • ${moment().calendar()}` })
  
  if(msg) msg.delete();
  button.reply({ embeds: [ozie], components: [], ephemeral: true});

    await uye.roles.add(ayar.erkekRolleri)
    await uye.roles.remove(ayar.unregRoles)
    await coin.findOneAndUpdate({ guildID: uye.guild.id, userID: message.author.id }, { $inc: { coin: settings.toplamsCoin } }, { upsert: true });
    await toplams.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $push: { toplams: uye.user.id } }, { upsert: true });
    await regstats.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { top: 1, topGuild24: 1, topGuild7: 1, top24: 1, top7: 1, top14: 1, erkek: 1, erkek24: 1, erkek7: 1, erkek14: 1, }, }, { upsert: true });
    await isimler.findOneAndUpdate({ guildID: message.guild.id, userID: uye.user.id }, { $push: { names: { name: uye.displayName, yetkili: message.author.id, rol: conf.erkekRolleri.map(x => `<@&${x}>`).join(" , "), date: Date.now() } } }, { upsert: true });
    const kayitgData = await kayitg.findOne({ guildID: message.guild.id, userID: message.author.id });
    if (kayitgData)
    {
    await kayitg.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { kayit: 1 } }, { upsert: true });
    }

    if(ayar.chatChannel && client.channels.cache.has(ayar.chatChannel)) client.channels.cache.get(ayar.chatChannel).send({ content:`Aramıza hoşgeldin **${uye}**! Kuralları okumayı unutma!`}).then((e) => setTimeout(() => { e.delete(); }, 20000));

         await otokayit.updateOne({
          userID: uye.user.id
           }, {
           $set: {
                  userID: uye.user.id,
                  roleID: erkekRol,
                  name: isim,
                  age: yaş
                }
             }, {
                 upsert: true
              }).exec();

}

if(button.customId === "WOMAN") {

let ozik = new MessageEmbed()
.setDescription(`
${uye.toString()} sunucumuza <@${message.author.id}> tarafından, \`${setName}\` ismiyle ${conf.kizRolleri.length > 1 ? conf.kizRolleri.slice(0, -1).map(x => `<@&${x}>`).join(", ") + " ve " + conf.kizRolleri.map(x => `<@&${x}>`).slice(-1) : conf.kizRolleri.map(x => `<@&${x}>`).join("")} rolleri verilerek kayıt edildi! 
`)
.setAuthor({ name: uye.displayName, iconURL: uye.user.displayAvatarURL({ dynamic: true }) })
.setThumbnail(uye.user.displayAvatarURL({ dynamic: true, size: 2048 }))
.setFooter({ text:`• Toplam kayıt: ${datas ? datas.top : 0} • Kadın kayıt : ${datas ? datas.kız : 0} • Erkek kayıt : ${datas ? datas.erkek : 0} • ${moment().calendar()}` })

if(msg) msg.delete();
button.reply({ embeds: [ozik], components: [], ephemeral: true});

    await uye.roles.add(ayar.kizRolleri)
-    await uye.roles.remove(ayar.unregRoles)
    await coin.findOneAndUpdate({ guildID: uye.guild.id, userID: message.author.id }, { $inc: { coin: settings.toplamsCoin } }, { upsert: true });
    await toplams.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $push: { toplams: uye.user.id } }, { upsert: true });
    await regstats.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { top: 1, topGuild24: 1, topGuild7: 1, top24: 1, top7: 1, top14: 1, kız: 1, kız24: 1, kız7: 1, kız14: 1, }, }, { upsert: true });
    await isimler.findOneAndUpdate({ guildID: message.guild.id, userID: uye.user.id }, { $push: { names: { name: uye.displayName, yetkili: message.author.id,  rol: conf.kizRolleri.map(x => `<@&${x}>`).join(" , "), date: Date.now() } } }, { upsert: true });
    const kayitgData = await kayitg.findOne({ guildID: message.guild.id, userID: message.author.id });
    if (kayitgData)
    {
    await kayitg.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { kayit: 1 } }, { upsert: true });
    }

    if(ayar.chatChannel && client.channels.cache.has(ayar.chatChannel)) client.channels.cache.get(ayar.chatChannel).send({ content:`Aramıza hoşgeldin **${uye}**! Kuralları okumayı unutma!`}).then((e) => setTimeout(() => { e.delete(); }, 20000));

         await otokayit.updateOne({
          userID: uye.user.id
           }, {
           $set: {
                  userID: uye.user.id,
                  roleID: kadinRol,
                  name: isim,
                  age: yaş
                }
             }, {
                 upsert: true
              }).exec();

}

if(button.customId === "İPTAL") {
if(msg) msg.delete();
button.reply({ content:`İşlem Başarıyla İptal Edildi ${green}`, embeds: [], components: [], ephemeral: true});
uye.setNickname(`${ayar.ikinciTag} İsim ' Yaş`)
await uye.roles.add(ayar.unregRoles)
await uye.roles.remove(ayar.kizRolleri)
await uye.roles.remove(ayar.erkekRolleri)
}

   });

  }
}   
}
