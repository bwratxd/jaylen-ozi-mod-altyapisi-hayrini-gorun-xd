const { Database } = require("ark.db");
const db = new Database("/src/configs/emojis.json");
const { MessageActionRow, MessageButton } = require("discord.js");
const ayar = require('../../configs/settings.json');
module.exports = {
  conf: {
    aliases: [],
    name: "kurulum",
    owner: true,
  },

  run: async (client, message, args) => {

    if (message.guild === null) {
      return message.reply({ content: `Bu komutu sadece Sunucuda kullanabilirsin!`, ephemeral: true })
    } else if (!ayar.owners.includes(message.author.id)) {
      return message.reply({ content: ":x: Bot developerı olmadığın için kurulumu yapamazsın.", ephemeral: true })
    } else {

  const row = new MessageActionRow()
  .addComponents(
  new MessageButton()
  .setCustomId("rol")
  .setLabel("Menü Rol Kurulum")
  .setStyle("PRIMARY"),

  new MessageButton()
  .setCustomId("kanal")
  .setLabel("Kanal Kurulum")
  .setStyle("SUCCESS"),

  new MessageButton()
  .setCustomId("emoji")
  .setLabel("Emoji Kurulum")
  .setStyle("DANGER"),
  );

      let msg = await message.channel.send({ content: `Lütfen **60 saniye** içerisinde hangi kurulum yapacağınızı aşağıdaki butonlara tıklayarak cevaplayınız.`, components: [row]})

      var filter = (button) => button.user.id === message.author.id;
      const collector = msg.createMessageComponentCollector({ filter, componentType: 'BUTTON', max: 3, time: 60000 })


      collector.on("collect", async interaction => {

        if (interaction.customId === "rol") {
          await interaction.deferUpdate();

         await interaction.guild.roles.create({
            name: "------------------------",
            color: "#000000",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });
  
          await interaction.guild.roles.create({
            name: "🍓",
            color: "#ff0000",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "🍊",
            color: "#ff8b00",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "🍇",
            color: "#4f00ff",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "🍑",
            color: "#ff00d1",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "🥑",
            color: "#56ff00",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "------------------------",
            color: "#000000",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "Alone 💔",
            color: "#b0d0f7",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "Couple 💍",
            color: "#e73084",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "------------------------",
            color: "#000000",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "Çekiliş Katılımcısı 🎉",
            color: "#f89292",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "Etkinlik Duyuru 🎉",
            color: "#f89292",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "------------------------",
            color: "#000000",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♏ Akrep",
            color: "#ffffff",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♉ Boğa",
            color: "#ffffff",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♍ Başak",
            color: "#ffffff",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♊ İkizler",
            color: "#ffffff",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♒ Kova",
            color: "#ffffff",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♈ Koç",
            color: "#ffffff",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♋ Yengeç",
            color: "#ffffff",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♑ Oğlak",
            color: "#ffffff",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♎ Terazi",
            color: "#ffffff",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♌ Aslan",
            color: "#ffffff",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♓ Balık",
            color: "#ffffff",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♐ Yay",
            color: "#ffffff",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "------------------------",
            color: "#000000",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "🎮 CS:GO",
            color: "#ffa7a7",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "🎮 League of Legends",
            color: "#ffa7a7",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "🎮 Valorant",
            color: "#ffa7a7",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "🎮 Gta V",
            color: "#ffa7a7",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "🎮 PUBG",
            color: "#ffa7a7",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "🎮 Fortnite",
            color: "#ffa7a7",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "------------------------",
            color: "#000000",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          msg.reply({ content: `Menü için gerekli Rollerin kurulumu başarıyla tamamlanmıştır.\n**Not:** Renk rollerini booster ve taglı rollerinin üstüne taşıyınız.`, ephemeral: true })

        }

        if (interaction.customId === "kanal") {
          await interaction.deferUpdate();

          const parent = await interaction.guild.channels.create('SUNUCU LOGLAR', {
            type: 'GUILD_CATEGORY',
            permissionOverwrites: [{
              id: interaction.guild.id,
              deny: ['VIEW_CHANNEL'],
            }]
          });

          await interaction.guild.channels.create('message_log', {
            type: 'GUILD_TEXT',
            parent: parent.id
          });
          await interaction.guild.channels.create('voice_log', {
            type: 'GUILD_TEXT',
            parent: parent.id
          });
          await interaction.guild.channels.create('taglı_log', {
            type: 'GUILD_TEXT',
            parent: parent.id
          });
          await interaction.guild.channels.create('rank_log', {
            type: 'GUILD_TEXT',
            parent: parent.id

          });
          await interaction.guild.channels.create('market_log', {
            type: 'GUILD_TEXT',
            parent: parent.id
          });
          await interaction.guild.channels.create('rol_log', {
            type: 'GUILD_TEXT',
            parent: parent.id
          });
          await interaction.guild.channels.create('yetki_log', {
            type: 'GUILD_TEXT',
            parent: parent.id
          });
          await interaction.guild.channels.create('komut_log', {
            type: 'GUILD_TEXT',
            parent: parent.id
          });

          msg.reply({ content: `Log Kanallarının kurulumu başarıyla tamamlanmıştır.`, ephemeral: true })

        }

        if (interaction.customId === "emoji") {
          await interaction.deferUpdate();

          const emojis = [
              { name: "star", url: "https://cdn.discordapp.com/emojis/899680497427431424.gif?size=44" },
              { name: "rewards", url: "https://cdn.discordapp.com/emojis/899680521951514734.gif?size=44" },
              { name: "revusome", url: "https://cdn.discordapp.com/emojis/901441419363889172.png?size=96" },
              { name: "miniicon", url: "https://cdn.discordapp.com/emojis/899339236724068372.png?size=44" },
              { name: "red", url: "https://cdn.discordapp.com/attachments/827439712834158622/827439875170500629/red.gif" },
              { name: "green", url: "https://cdn.discordapp.com/attachments/827439712834158622/827439878664486913/green.gif" },
              { name: "staff", url: "https://cdn.discordapp.com/emojis/899680505119780895.gif?size=44" },
              { name: "Muhabbet", url: "https://cdn.discordapp.com/emojis/899339317896429641.gif?size=44" },
              { name: "galp", url: "https://cdn.discordapp.com/emojis/899680513806184570.gif?size=44" },
              { name: "kirmiziok", url: "https://cdn.discordapp.com/emojis/901441275381817426.gif?size=44" },
              { name: "Revuu", url: "https://cdn.discordapp.com/emojis/901441322152493066.gif?size=44" },
              { name: "Mute", url: "https://cdn.discordapp.com/emojis/901441287469809706.png?size=44" },
              { name: "Cezaa", url: "https://cdn.discordapp.com/emojis/901441311050178591.png?size=44" },
              { name: "Jail", url: "https://cdn.discordapp.com/emojis/903566151727087686.png?size=96" },
              { name: "Book", url: "https://cdn.discordapp.com/emojis/903564842978402304.png?size=96" },
              { name: "Kilit", url: "https://cdn.discordapp.com/emojis/903564832387760128.png?size=96" },
              { name: "Mute2", url: "https://cdn.discordapp.com/emojis/899339342986739802.png?size=96" },
              { name: "Unmute", url: "https://cdn.discordapp.com/emojis/899339351283105812.png?size=96" },
              { name: "fill", url: "https://cdn.discordapp.com/emojis/899339288636956752.gif?size=44" },
              { name: "empty", url: "https://cdn.discordapp.com/emojis/899340041229307966.png?size=44" },
              { name: "fillStart", url: "https://cdn.discordapp.com/emojis/899339278000222249.gif?size=44" },
              { name: "emptyEnd", url: "https://cdn.discordapp.com/emojis/899340050226118737.png?size=44" },
              { name: "fillEnd", url: "https://cdn.discordapp.com/emojis/862062197776580618.gif?size=96" },
              { name: "xp", url: "https://cdn.discordapp.com/emojis/838468875825446922.gif?v=1" },
              { name: "gulucuk", url: "https://cdn.discordapp.com/emojis/838469248602865735.png?v=1" },
              { name: "mesaj2", url: "https://cdn.discordapp.com/emojis/838468915814334464.gif?v=1" },
              { name: "altin", url: "https://cdn.discordapp.com/emojis/836694825243508756.gif?v=1" },
              { name: "altin2", url: "https://cdn.discordapp.com/emojis/836694821128372224.gif?v=1" },
              { name: "voice", url: "https://cdn.discordapp.com/emojis/841076020399308831.png?v=1" },
              { name: "channel", url: "https://cdn.discordapp.com/emojis/841076020399308831.png?v=1" },
              { name: "ozispotify", url: "https://cdn.discordapp.com/emojis/899337292840312912.png?size=44" },
              { name: "ozinetflix", url: "https://cdn.discordapp.com/emojis/941993358518284298.webp?size=96&quality=lossless" },
              { name: "oziexxen", url: "https://cdn.discordapp.com/emojis/900396713116835900.png?size=44" },
              { name: "oziblutv", url: "https://cdn.discordapp.com/emojis/900396707362246666.png?size=44" },
              { name: "ozinitro", url: "https://cdn.discordapp.com/emojis/941993742934614047.webp?size=96&quality=lossless" },
              { name: "oziyoutube", url: "https://cdn.discordapp.com/emojis/941993963013935115.gif?size=96&quality=lossless" },
              { name: "slotgif", url: "https://cdn.discordapp.com/emojis/931686726567612426.gif?v=1" },
              { name: "slotpatlican", url: "https://cdn.discordapp.com/emojis/931686717902192660.png?size=44" },
              { name: "slotkiraz", url: "https://cdn.discordapp.com/emojis/931686708037185546.png?size=44" },
              { name: "slotkalp", url: "https://cdn.discordapp.com/emojis/931686698138603610.png?size=44" },
              { name: "sifir", url: "https://cdn.discordapp.com/emojis/943146617043828788.gif?size=96&quality=lossless" },
              { name: "bir", url: "https://cdn.discordapp.com/emojis/943147988375715861.gif?size=96&quality=lossless" },
              { name: "iki", url: "https://cdn.discordapp.com/emojis/943148029639278622.gif?size=96&quality=lossless" },
              { name: "uc", url: "https://cdn.discordapp.com/emojis/943148080025460766.gif?size=96&quality=lossless" },
              { name: "dort", url: "https://cdn.discordapp.com/emojis/943148147327262751.gif?size=96&quality=lossless" },
              { name: "bes", url: "https://cdn.discordapp.com/emojis/943148227753033809.gif?size=96&quality=lossless" },
              { name: "alti", url: "https://cdn.discordapp.com/emojis/943148271738707988.gif?size=96&quality=lossless" },
              { name: "yedi", url: "https://cdn.discordapp.com/emojis/943148318165442700.gif?size=96&quality=lossless" },
              { name: "sekiz", url: "https://cdn.discordapp.com/emojis/943148360368537620.gif?size=96&quality=lossless" },
              { name: "dokuz", url: "https://cdn.discordapp.com/emojis/943148402655510620.gif?size=96&quality=lossless" },
              { name: "partner", url: "https://cdn.discordapp.com/emojis/923691826374934618.webp?size=96&quality=lossless" },
              { name: "online", url: "https://cdn.discordapp.com/emojis/901829756603998269.webp?size=96&quality=lossless" },
              { name: "duyuru", url: "https://cdn.discordapp.com/emojis/935136070377553930.webp?size=96&quality=lossless" }
            ]
          emojis.forEach(async (x) => {
              if (interaction.guild.emojis.cache.find((e) => x.name === e.name)) return db.set(x.name, interaction.guild.emojis.cache.find((e) => x.name === e.name).toString());
              const emoji = await interaction.guild.emojis.create(x.url, x.name);
              await db.set(x.name, emoji.toString()); 
              msg.reply({ content: `Emoji kurulumu başarıyla tamamlanmıştır.`, ephemeral: true })

            })
        }
  
      })

    }
  },
};