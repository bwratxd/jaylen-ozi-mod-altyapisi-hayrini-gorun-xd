const { MessageEmbed, Client, Message, MessageButton, MessageActionRow, MessageSelectMenu } = require("discord.js");
const { ozinitro, ozinetflix, ozispotify, oziexxen, oziblutv, oziyoutube, star } = require("../../configs/emojis.json")
const Discord = require('discord.js');
const conf = require("../../configs/sunucuayar.json");
const ayarlar = require("../../configs/settings.json");
const client = global.bot;

module.exports = {
  conf: {
    aliases: [],
    name: "menü",
    owner: true,
  },
 
    run: async (client, message, args, durum, kanal) => {

let embed = new MessageEmbed()
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) }).setTimestamp().setColor(message.author.displayHexColor).setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })}).setThumbnail(message.guild.iconURL({ dynamic: true }))
.addField(`ROL MENÜ KURULUM`,`
\` ❯ \` Kurmak istediğiniz rol menü kategorisini aşağıdaki butonlardan seçebilirsiniz.
`)
    

let ozi = await message.channel.send({
    "embeds": [embed],
      "components":[{
        "type":1,
        "components":[
                {"type":2,"style":2,"custom_id":"hepsi","label":"Hepsi (Rol Seçimler)", "emoji": { "id": "901357196124774471" } },
                {"type":2,"style":2,"custom_id":"etkinlikmenü","label":"Etkinlik/Çekiliş", "emoji": { "id": "941993742934614047" } },
                {"type":2,"style":2,"custom_id":"ilişkimenü","label":"İlişki Durumu Seçim", "emoji": { "id": "956149326877438002" } },
            ]}, {  "type":1,"components":[
                {"type":2,"style":2,"custom_id":"burçmenü","label":"Burç Seçim", "emoji": { "id": "931658529314603008" } },
                {"type":2,"style":2,"custom_id":"oyunmenü","label":"Oyun Seçim", "emoji": { "id": "956149332313243668" } },
                {"type":2,"style":2,"custom_id":"renkmenü","label":"Renk Seçim", "emoji": { "id": "746992558927904891" } },
                {"type":2,"style":4,"custom_id":"iptal","label":"İşlem İptal", "emoji": { "id": "921703086823714858" } },
               ]}
        ]})


    var filter = (xd) => xd.user.id === message.author.id;
    let collector = await ozi.createMessageComponentCollector({ filter,  time: 30000 })
    
    collector.on("collect", async (button) => {
    
        if (button.customId === "hepsi") {
        await ozi.delete({ timeout: 1500 });

        client.api.channels(message.channel.id).messages.post({
            data: {
                "content": `
:tada: Sunucuda sizleri rahatsız etmemek için \`@everyone\` veya \`@here\` atmayacağız. Sadece isteğiniz doğrultusunda aşağıda bulunan tepkilere tıklarsanız Çekilişler,Etkinlikler V/K ve D/C'den haberdar olacaksınız.

\` ⦁ \` Eğer \`@Etkinlik Katılımcısı\` Rolünü alırsanız sunucumuzda düzenlenecek olan etkinlikler, konserler ve oyun etkinlikleri gibi etkinliklerden haberdar olabilirsiniz. 
                        
\` ⦁ \` Eğer \`@Çekiliş Katılımcısı\` Rolünü alırsanız sunucumuzda sıkça vereceğimiz ${ozinitro} , ${ozispotify} , ${oziyoutube} , ${ozinetflix} , ${oziexxen} ve daha nice ödüllerin bulunduğu çekilişlerden haberdar olabilirsiniz. 

**NOT:** \`Kayıtlı, kayıtsız olarak hepiniz bu kanalı görebilmektesiniz. Sunucumuz da everyone veya here atılmayacağından dolayı kesinlikle rollerinizi almayı unutmayın.\``,
                "components": [{
                    "type": 1, "components": [{
                        "type": 3, "custom_id": "etkinliks", "options": [
                            { "label": "Etkinlik Katılımcısı", "description": "Etkinliklerden haberdar olmak için", "value": "etkinlik", "emoji": { "id": "941075067230625803" }, },
                            { "label": "Çekiliş Katılımcısı", "description": "Çekilişlerden haberdar olmak için", "value": "cekilis", "emoji": { "id": "941074179401338900" }, },
                            { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" }, }
                        ], "placeholder": "Etkinlik Rolleri", "min_values": 0, "max_values": 2
                    }],
                }
                ]
            }
        })
        client.api.channels(message.channel.id).messages.post({
            data: {
                "content": `${star} Aşağıda ki menüden **Burç** rollerinden dilediğinizi alabilirsiniz.`,
                "components": [{
                    "type": 1, "components": [{
                        "type": 3, "custom_id": "burc", "options": [
                            { "label": "Koç", "value": "koç", "emoji": { "id": "931658251181887508" }, },
                            { "label": "Boğa", "value": "boğa", "emoji": { "id": "931659095629529168" }, },
                            { "label": "İkizler", "value": "ikizler", "emoji": { "id": "931658687028789289" }, },
                            { "label": "Yengeç", "value": "yengeç", "emoji": { "id": "931658642955075604" }, },
                            { "label": "Aslan", "value": "aslan", "emoji": { "id": "931657544756248606" }, },
                            { "label": "Başak", "value": "başak", "emoji": { "id": "931658178482012201" }, },
                            { "label": "Terazi", "value": "terazi", "emoji": { "id": "931658529314603008" }, },
                            { "label": "Akrep", "value": "akrep", "emoji": { "id": "931658863923593297" }, },
                            { "label": "Yay", "value": "yay", "emoji": { "id": "931658575951048714" }, },
                            { "label": "Oğlak", "value": "oğlak", "emoji": { "id": "931658464512598056" }, },
                            { "label": "Kova", "value": "kova", "emoji": { "id": "931658397860892672" }, },
                            { "label": "Balık", "value": "balık", "emoji": { "id": "931657587886264340" }, },
                            { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" }, }
                        ], "placeholder": "Burç Rolleri", "min_values": 1, "max_values": 1
                    }],
                }
                ]
            }
        })
        client.api.channels(message.channel.id).messages.post({
            data: {
                "content": `${star} Aşağıda ki menüden **Oyun** rollerinden dilediğinizi alabilirsiniz.`,
                "components": [{
                    "type": 1, "components": [{
                        "type": 3, "custom_id": "games", "options": [
                            { "label": "CS:GO", "value": "csgo", "emoji": { "id": "880606175274598461" }, },
                            { "label": "League of Legends", "value": "lol", "emoji": { "id": "880606175761145906" }, },
                            { "label": "Valorant", "value": "valorant", "emoji": { "id": "880606175387873281" }, },
                            { "label": "Gta V", "value": "gta5", "emoji": { "id": "880606175408824321" }, },
                            { "label": "PUBG", "value": "pubg", "emoji": { "id": "880606175178153994" }, },
                            { "label": "Fortnite", "value": "fortnite", "emoji": { "id": "880606175488540693" }, },
                        ], "placeholder": "Oyun Rolleri", "min_values": 0, "max_values": 6
                    }],
                }
                ]
            }
        })
        client.api.channels(message.channel.id).messages.post({
            data: {
                "content": `${star} Aşağıda ki menüden **Renk** rollerinden dilediğinizi alabilirsiniz.`,
                "components": [{
                    "type": 1, "components": [{
                        "type": 3, "custom_id": "renk", "options": [
                            { "label": "Kırmızı", "description": "Kırmızı rengine sahip olmak için tıkla!", "value": "kirmizi", "emoji": { "name": "🍓" }, },
                            { "label": "Turuncu", "description": "Turuncu rengine sahip olmak için tıkla!", "value": "turuncu", "emoji": { "name": "🍊" }, },
                            { "label": "Mor", "description": "Mor rengine sahip olmak için tıkla!", "value": "mor", "emoji": { "name": "🍇" }, },
                            { "label": "Pembe", "description": "Pembe rengine sahip olmak için tıkla!", "value": "pembe", "emoji": { "name": "🍑" }, },
                            { "label": "Yeşil", "description": "Yeşil rengine sahip olmak için tıkla!", "value": "yesil", "emoji": { "name": "🥑" }, },
                            { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" }, }
                        ], "placeholder": "Renk Rolleri", "min_values": 1, "max_values": 1
                    }],
                }
                ]
            }
        })
        client.api.channels(message.channel.id).messages.post({
            data: {
                "content": `${star} Aşağıda ki menüden **İlişki** rollerinden dilediğinizi alabilirsiniz.`,
                "components": [{
                    "type": 1, "components": [{
                        "type": 3, "custom_id": "iliski", "options": [
                            { "label": "Sevgilim Var", "value": "couple", "emoji": { "id": "855054137296814101" }, },
                            { "label": "Sevgilim Yok", "value": "alone", "emoji": { "id": "835704673204830238" }, },
                            { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" }, }
                        ], "placeholder": "İlişki Rolleri", "min_values": 1, "max_values": 1
                    }],
                }
                ]
            }
        })
        }

        if (button.customId === "etkinlikmenü") {
        await ozi.delete({ timeout: 1500 });
        client.api.channels(message.channel.id).messages.post({
            data: {
                "content": `
:tada: Sunucuda sizleri rahatsız etmemek için \`@everyone\` veya \`@here\` atmayacağız. Sadece isteğiniz doğrultusunda aşağıda bulunan tepkilere tıklarsanız Çekilişler,Etkinlikler V/K ve D/C'den haberdar olacaksınız.

\` ⦁ \` Eğer \`@Etkinlik Katılımcısı\` Rolünü alırsanız sunucumuzda düzenlenecek olan etkinlikler, konserler ve oyun etkinlikleri gibi etkinliklerden haberdar olabilirsiniz. 
                        
\` ⦁ \` Eğer \`@Çekiliş Katılımcısı\` Rolünü alırsanız sunucumuzda sıkça vereceğimiz ${ozinitro} , ${ozispotify} , ${oziyoutube} , ${ozinetflix} , ${oziexxen} ve daha nice ödüllerin bulunduğu çekilişlerden haberdar olabilirsiniz. 

**NOT:** \`Kayıtlı, kayıtsız olarak hepiniz bu kanalı görebilmektesiniz. Sunucumuz da everyone veya here atılmayacağından dolayı kesinlikle rollerinizi almayı unutmayın.\``,
                "components": [{
                    "type": 1, "components": [{
                        "type": 3, "custom_id": "etkinliks", "options": [
                            { "label": "Etkinlik Katılımcısı", "description": "Etkinliklerden haberdar olmak için", "value": "etkinlik", "emoji": { "id": "941075067230625803" }, },
                            { "label": "Çekiliş Katılımcısı", "description": "Çekilişlerden haberdar olmak için", "value": "cekilis", "emoji": { "id": "941074179401338900" }, },
                            { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" }, }
                        ], "placeholder": "Etkinlik Rolleri", "min_values": 0, "max_values": 2
                    }],
                }
                ]
            }
        })
        }
    
        if (button.customId === "ilişkimenü") {
        await ozi.delete({ timeout: 1500 });
        client.api.channels(message.channel.id).messages.post({
            data: {
                "content": `${star} Aşağıda ki menüden **İlişki** rollerinden dilediğinizi alabilirsiniz.`,
                "components": [{
                    "type": 1, "components": [{
                        "type": 3, "custom_id": "iliski", "options": [
                            { "label": "Sevgilim Var", "value": "couple", "emoji": { "id": "855054137296814101" }, },
                            { "label": "Sevgilim Yok", "value": "alone", "emoji": { "id": "835704673204830238" }, },
                            { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" }, }
                        ], "placeholder": "İlişki Rolleri", "min_values": 1, "max_values": 1
                    }],
                }
                ]
            }
        })
        }
    
        if (button.customId === "burçmenü") {
        await ozi.delete({ timeout: 1500 });
        client.api.channels(message.channel.id).messages.post({
            data: {
                "content": `${star} Aşağıda ki menüden **Burç** rollerinden dilediğinizi alabilirsiniz.`,
                "components": [{
                    "type": 1, "components": [{
                        "type": 3, "custom_id": "burc", "options": [
                            { "label": "Koç", "value": "koç", "emoji": { "id": "931658251181887508" }, },
                            { "label": "Boğa", "value": "boğa", "emoji": { "id": "931659095629529168" }, },
                            { "label": "İkizler", "value": "ikizler", "emoji": { "id": "931658687028789289" }, },
                            { "label": "Yengeç", "value": "yengeç", "emoji": { "id": "931658642955075604" }, },
                            { "label": "Aslan", "value": "aslan", "emoji": { "id": "931657544756248606" }, },
                            { "label": "Başak", "value": "başak", "emoji": { "id": "931658178482012201" }, },
                            { "label": "Terazi", "value": "terazi", "emoji": { "id": "931658529314603008" }, },
                            { "label": "Akrep", "value": "akrep", "emoji": { "id": "931658863923593297" }, },
                            { "label": "Yay", "value": "yay", "emoji": { "id": "931658575951048714" }, },
                            { "label": "Oğlak", "value": "oğlak", "emoji": { "id": "931658464512598056" }, },
                            { "label": "Kova", "value": "kova", "emoji": { "id": "931658397860892672" }, },
                            { "label": "Balık", "value": "balık", "emoji": { "id": "931657587886264340" }, },
                            { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" }, }
                        ], "placeholder": "Burç Rolleri", "min_values": 1, "max_values": 1
                    }],
                }
                ]
            }
        })
        }
    
        if (button.customId === "oyunmenü") {
        await ozi.delete({ timeout: 1500 });
        client.api.channels(message.channel.id).messages.post({
            data: {
                "content": `${star} Aşağıda ki menüden **Oyun** rollerinden dilediğinizi alabilirsiniz.`,
                "components": [{
                    "type": 1, "components": [{
                        "type": 3, "custom_id": "games", "options": [
                            { "label": "CS:GO", "value": "csgo", "emoji": { "id": "880606175274598461" }, },
                            { "label": "League of Legends", "value": "lol", "emoji": { "id": "880606175761145906" }, },
                            { "label": "Valorant", "value": "valorant", "emoji": { "id": "880606175387873281" }, },
                            { "label": "Gta V", "value": "gta5", "emoji": { "id": "880606175408824321" }, },
                            { "label": "PUBG", "value": "pubg", "emoji": { "id": "880606175178153994" }, },
                            { "label": "Fortnite", "value": "fortnite", "emoji": { "id": "880606175488540693" }, },
                        ], "placeholder": "Oyun Rolleri", "min_values": 0, "max_values": 6
                    }],
                }
                ]
            }
        })
        }
    
        if (button.customId === "renkmenü") {
        await ozi.delete({ timeout: 1500 });
        client.api.channels(message.channel.id).messages.post({
            data: {
                "content": `${star} Aşağıda ki menüden **Renk** rollerinden dilediğinizi alabilirsiniz.`,
                "components": [{
                    "type": 1, "components": [{
                        "type": 3, "custom_id": "renk", "options": [
                            { "label": "Kırmızı", "description": "Kırmızı rengine sahip olmak için tıkla!", "value": "kirmizi", "emoji": { "name": "🍓" }, },
                            { "label": "Turuncu", "description": "Turuncu rengine sahip olmak için tıkla!", "value": "turuncu", "emoji": { "name": "🍊" }, },
                            { "label": "Mor", "description": "Mor rengine sahip olmak için tıkla!", "value": "mor", "emoji": { "name": "🍇" }, },
                            { "label": "Pembe", "description": "Pembe rengine sahip olmak için tıkla!", "value": "pembe", "emoji": { "name": "🍑" }, },
                            { "label": "Yeşil", "description": "Yeşil rengine sahip olmak için tıkla!", "value": "yesil", "emoji": { "name": "🥑" }, },
                            { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" }, }
                        ], "placeholder": "Renk Rolleri", "min_values": 1, "max_values": 1
                    }],
                }
                ]
            }
        })
        }
    
        if (button.customId == "iptal") {
        await ozi.delete({ timeout: 1500 });
        }
    
    }
    )}
    
}



client.on('interactionCreate', async interaction => {
const member = await client.guilds.cache.get(ayarlar.guildID).members.fetch(interaction.member.user.id)
if (!member) return;

const etkinlik = await client.guilds.cache.get(ayarlar.guildID).roles.cache.find(x => x.name.includes(conf.etkinlik)).id
const cekilis = await client.guilds.cache.get(ayarlar.guildID).roles.cache.find(x => x.name.includes(conf.cekilis)).id
 
 if (interaction.customId === "etkinliks") {
        let eventsMap = new Map([
          ["etkinlik", etkinlik],
          ["cekilis", cekilis],
        ])
        let roles = [etkinlik, cekilis]
        var role = []
        for (let index = 0; index < interaction.values.length; index++) {
          let ids = interaction.values[index]
          let den = eventsMap.get(ids)
          var role = []
          role.push(den);
        }
        if (interaction.values[0] === "rolsil") {
            await member.roles.remove(roles)
          } else {
            if (!interaction.values.length) {
                await member.roles.remove(roles).catch(err => {})
              } else if (interaction.values.length > 1) {
                await member.roles.add(roles).catch(err => {})
              } else {
                await member.roles.remove(roles).catch(err => {})
                await member.roles.add(role).catch(err => {})
              }
          }
        interaction.reply({ content: "Rolleriniz düzenlendi.", ephemeral: true })
      } 

const koç = await client.guilds.cache.get(ayarlar.guildID).roles.cache.find(x => x.name.includes(conf.Burçlar.koç)).id
const boğa = await client.guilds.cache.get(ayarlar.guildID).roles.cache.find(x => x.name.includes(conf.Burçlar.boğa)).id
const ikizler = await client.guilds.cache.get(ayarlar.guildID).roles.cache.find(x => x.name.includes(conf.Burçlar.ikizler)).id
const yengeç = await client.guilds.cache.get(ayarlar.guildID).roles.cache.find(x => x.name.includes(conf.Burçlar.yengeç)).id
const aslan = await client.guilds.cache.get(ayarlar.guildID).roles.cache.find(x => x.name.includes(conf.Burçlar.aslan)).id
const başak = await client.guilds.cache.get(ayarlar.guildID).roles.cache.find(x => x.name.includes(conf.Burçlar.başak)).id
const terazi = await client.guilds.cache.get(ayarlar.guildID).roles.cache.find(x => x.name.includes(conf.Burçlar.terazi)).id
const akrep = await client.guilds.cache.get(ayarlar.guildID).roles.cache.find(x => x.name.includes(conf.Burçlar.akrep)).id
const yay = await client.guilds.cache.get(ayarlar.guildID).roles.cache.find(x => x.name.includes(conf.Burçlar.yay)).id
const oğlak = await client.guilds.cache.get(ayarlar.guildID).roles.cache.find(x => x.name.includes(conf.Burçlar.oğlak)).id
const kova = await client.guilds.cache.get(ayarlar.guildID).roles.cache.find(x => x.name.includes(conf.Burçlar.kova)).id
const balık = await client.guilds.cache.get(ayarlar.guildID).roles.cache.find(x => x.name.includes(conf.Burçlar.balık)).id

      if (interaction.customId === "burc") {
        let burçMap = new Map([
            ["koç", koç],
            ["boğa", boğa],
            ["ikizler", ikizler],
            ["yengeç", yengeç],
            ["aslan", aslan],
            ["başak", başak],
            ["terazi", terazi],
            ["akrep", akrep],
            ["yay", yay],
            ["oğlak", oğlak],
            ["kova", kova],
            ["balık", balık],
          ])
          let roles = [koç, boğa, ikizler, yengeç, aslan, başak, terazi, akrep, yay, oğlak, kova, balık]
          let role = burçMap.get(interaction.values[0])
          if (interaction.values[0] === "rolsil") {
            await member.roles.remove(roles)
          } else if (role) {
            if (roles.some(m => member.roles.cache.has(m))) {
              await member.roles.remove(roles)
            }
            await member.roles.add(role)
          }
          interaction.reply({ content: "Rolleriniz düzenlendi.", ephemeral: true })    
      }

const csgo = await client.guilds.cache.get(ayarlar.guildID).roles.cache.find(x => x.name.includes(conf.Oyunlar.csgo)).id
const lol = await client.guilds.cache.get(ayarlar.guildID).roles.cache.find(x => x.name.includes(conf.Oyunlar.lol)).id
const valorant = await client.guilds.cache.get(ayarlar.guildID).roles.cache.find(x => x.name.includes(conf.Oyunlar.valorant)).id
const gta5 = await client.guilds.cache.get(ayarlar.guildID).roles.cache.find(x => x.name.includes(conf.Oyunlar.gta5)).id
const pubg = await client.guilds.cache.get(ayarlar.guildID).roles.cache.find(x => x.name.includes(conf.Oyunlar.pubg)).id
const fortnite = await client.guilds.cache.get(ayarlar.guildID).roles.cache.find(x => x.name.includes(conf.Oyunlar.fortnite)).id

    if (interaction.customId === "games") {
        let GameMap = new Map([
          ["csgo", csgo],
          ["lol", lol],
          ["valorant", valorant],
          ["gta5", gta5],
          ["pubg", pubg],
          ["fortnite", fortnite],
        ])
        let roles = [csgo, lol, valorant, gta5, pubg, fortnite]
        var role = []
        for (let index = 0; index < interaction.values.length; index++) {
          let ids = interaction.values[index]
          let den = GameMap.get(ids)
          role.push(den)
        }
        if (!interaction.values.length) {
          await member.roles.remove(roles)
        } else {
          await member.roles.remove(roles)
          await member.roles.add(role)
        } 
        interaction.reply({ content: "Rolleriniz düzenlendi.", ephemeral: true })
      }

const kirmizi = await client.guilds.cache.get(ayarlar.guildID).roles.cache.find(x => x.name.includes(conf.Renkler.kirmizi)).id
const turuncu = await client.guilds.cache.get(ayarlar.guildID).roles.cache.find(x => x.name.includes(conf.Renkler.turuncu)).id
const mor = await client.guilds.cache.get(ayarlar.guildID).roles.cache.find(x => x.name.includes(conf.Renkler.mor)).id
const pembe = await client.guilds.cache.get(ayarlar.guildID).roles.cache.find(x => x.name.includes(conf.Renkler.pembe)).id
const yesil = await client.guilds.cache.get(ayarlar.guildID).roles.cache.find(x => x.name.includes(conf.Renkler.yesil)).id

if (interaction.customId === "renk") {
        let color = new Map([
          ["kirmizi", kirmizi],
          ["turuncu", turuncu],
          ["mor", mor],
          ["pembe", pembe],
          ["yesil", yesil],
  
        ])
        let role = color.get(interaction.values[0])
        let renkroller = [kirmizi, turuncu, mor, pembe, yesil]
        if (!member.roles.cache.has(conf.ekipRolu) && !member.roles.cache.has(conf.boosterRolu) && !member.permissions.has("ADMINISTRATOR")) {
            interaction.reply({ content: "Rollerin güncellenirken bir sorun meydana geldi **(İsminde Sunucu Tag'ı Yoktur veya Boost basmamışsın)**" , ephemeral: true })
        } else {
          if (interaction.values[0] === "rolsil") {
            await member.roles.remove(renkroller)
          } else if (role) {
            if (renkroller.some(m => member.roles.cache.has(m))) {
              await member.roles.remove(renkroller)
            }
            await member.roles.add(role)
          }
          interaction.reply({ content: "Rolleriniz düzenlendi.", ephemeral: true })
        }
      }

const sevgili = await client.guilds.cache.get(ayarlar.guildID).roles.cache.find(x => x.name.includes(conf.İlişkiler.couple)).id
const yalnız = await client.guilds.cache.get(ayarlar.guildID).roles.cache.find(x => x.name.includes(conf.İlişkiler.alone)).id

      if (interaction.customId === "iliski") {
        let ilişki = new Map([
            ["couple", sevgili],
            ["alone", yalnız],
          ])
          let role = ilişki.get(interaction.values[0])
          let iliskiroller = [sevgili, yalnız]

            if (interaction.values[0] === "rolsil") {
              await member.roles.remove(iliskiroller)
            } else if (role) {
              if (iliskiroller.some(m => member.roles.cache.has(m))) {
                await member.roles.remove(iliskiroller)
              }
              await member.roles.add(role)
            }
            interaction.reply({ content: "Rolleriniz düzenlendi.", ephemeral: true })
    }
})