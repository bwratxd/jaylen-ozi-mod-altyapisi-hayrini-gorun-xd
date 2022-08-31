const ozi = require("../../schemas/dolar");
let limit = new Map();
const ms = require("discord.js");
const { rewards, slotgif, slotpatlican, slotkiraz, slotkalp } = require("../../configs/emojis.json")

module.exports = {
    conf: {
      aliases: ["s", "slot", "Slot"],
      name: "slot",
      help: "slot"
    },
  
run: async (client, message, args, embed, prefix) => {

    if (!message.guild) return;
	
    let dolarData = await ozi.findOne({ guildID: message.guild.id, userID: message.author.id });  
    if (!dolarData || dolarData && !dolarData.dolar) return await message.reply({ content:"Komutu kullanabilmek için Hesap oluşturmanız gerekmektedir. \`!hesapoluştur\`"})
  
		let kanallar = ["bot-commands"]
	if (!kanallar.includes(message.channel.name)) return message.reply({ content:`${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
	

	  let data = limit.get(message.author.id) || {dailyCoinTime: 0};
    let timeout = 1000*8
    let gunluk = data.dailyCoinTime
    if (gunluk !== null && timeout - (Date.now() - gunluk) > 0) {
        let time = ms(timeout - (Date.now() - gunluk));
        message.reply({ content:`:stopwatch: **|** Hata! **${message.author.username}** Bu komutu ${time.seconds} saniye sonra kullanabilirsin.`})
	} else {
	limit.set(message.author.id, {dailyCoinTime: Date.now()})
	setTimeout(() => {
		limit.delete(message.author.id)
	}, 1000*8)

    const slot = [slotkalp, slotkiraz, slotpatlican] 

    let sec = args[0];
    if (!sec) return message.reply({ content:`:no_entry: | **${message.author.username},** Lütfen bir bahis değeri giriniz!!`})


    let ozislot1 = slot[Math.floor(Math.random() * slot.length)];
    let ozislot2 = slot[Math.floor(Math.random() * slot.length)];
    let ozislot3 = slot[Math.floor(Math.random() * slot.length)];


    if(dolarData.dolar < sec) return message.reply({ content:`:no_entry: | **${message.author.username}**, Yeterli miktar da paran yoktur! (Max: 50.000 Tutarında Oynayabilirsin)`}) 


let slotMessage = await message.reply(`
\`___SLOTS___\`
 ${slotgif} ${slotgif} ${slotgif}
**\`|         |\`**
**\`|         |\`**
`)


setTimeout(() => {
if(ozislot1 === ozislot2 && ozislot1 === ozislot3 ) {

let carpma = sec * 2
dolarData.dolar = (dolarData.dolar + carpma)
dolarData.save();

slotMessage.edit(`
\`___SLOTS___\`
  ${ozislot1} ${ozislot2} ${ozislot3}
\`|         |\`
\`|         |\`
Tebrikler **${carpma}** ${rewards} miktar para kazandın!`)

} else {

  dolarData.dolar = (dolarData.dolar - sec)
  dolarData.save();

slotMessage.edit(`
\`___SLOTS___\`
 ${ozislot1} ${ozislot2} ${ozislot3}
**\`|         |\`**
**\`|         |\`**
**TÜH!** ${sec} ${rewards} Kaybettin bi dahaki sefer kazanman dileğiyle (:`)
}
}, 2500)

}}}
