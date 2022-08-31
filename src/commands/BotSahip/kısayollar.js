const { MessageEmbed, Client, Message, MessageActionRow, MessageSelectMenu } = require("discord.js");
const Discord = require('discord.js');
const client = global.bot;
const { star } = require("../../configs/emojis.json")

module.exports = {
  conf: {
    aliases: ["kısayollar"],
    name: "kısayollar",
    help: "kısayollar",
    owner: true
  },
 
    run: async (client, message, args, durum, kanal) => {
		let kısayollar = await message.channel.send({ embeds: [embed.setDescription(`:tada: Selam **${message.author}** Komutları Görmek İçin Aşağıdaki Menüden Bakabilirsin!`)] })

			.addComponents(
				new MessageSelectMenu()
					.setCustomId('kısayollar')
					.setPlaceholder('Komutlar hakkında yardım almak için tıkla!')
					.addOptions([
						{
							label: 'Davet Komutları',
							description: 'Davet Komutlar kategorisinin yardım bilgileri için tıkla!',
							value: 'invite',
						},
						{
							label: 'Genel Komutları',
							description: 'Genel Komutlar kategorisinin yardım bilgileri için tıkla!',
							value: 'genel',
						},						
            {
							label: 'Kayıt Komutları',
							description: 'Kayıt Komutlar kategorisinin yardım bilgileri için tıkla!',
							value: 'kayıt',
						},
            {
							label: 'Kurucu Komutları',
							description: 'Kurucu Komutlar kategorisinin yardım bilgileri için tıkla!',
							value: 'kurucu',
						},
            {
							label: 'Moderasyon Komutları',
							description: 'Moderasyon Komutlar kategorisinin yardım bilgileri için tıkla!',
							value: 'moderasyon',
						},
            {
							label: 'Stat Komutları',
							description: 'Stat Komutlar kategorisinin yardım bilgileri için tıkla!',
							value: 'stat',
						},
            {
							label: 'Yetkili Komutları',
							description: 'Yetkili Komutlar kategorisinin yardım bilgileri için tıkla!',
							value: 'yetkili',
						},
					]),
			);
  
     await message.channel.send({ content : `${star} \`${message.guild.name}\`, bot komutlarını incelemek için aşağıdaki menüyü kullan!`, components: [kısayollar] });

    },
  };

  client.on('interactionCreate', interaction => {
    if (!interaction.isSelectMenu()) return;

if (interaction.values[0] === "invite") {
    interaction.reply({ content : `
\`\`\`
- .invite (stat [user])
- .topdavet (topdavet)
\`\`\`
`, ephemeral: true })
};

if (interaction.values[0] === "genel") {
    interaction.reply({ content : `
\`\`\`
- .afk (afk [sebep])
- .avatar (avatar [UserID/@User])
- .banner (banner [UserID/@User])
- .booster (boost [nick])
- .profil (profil / [@üye])
- .tag (tag)
- .yardım (yardım)
- .çek (çek [@üye])
- .git (git [@üye])
- .market (coinmarket) 
- .satınal (satınal) 
- .görev (görev [user])
- .coin [ekle/sil/gönder] [kullanıcı] [sayı]
\`\`\`
`, ephemeral: true })
};

if (interaction.values[0] === "kayıt") {
    interaction.reply({ content : `
\`\`\`
- .taglı-alım [aç/kapat]
- .kayıt (kayıt [user] İsim Yaş)
- .bağlantı-kes ([user])
- .isim (isim [user] [name | age])
- .isimler (isimler [user])
- .top-teyit (top-teyit)
- .unregister (unregister [user])
\`\`\`
`, ephemeral: true })
};
  
if (interaction.values[0] === "kurucu") {
    interaction.reply({ content : `
\`\`\`
- .kilit ([aç/kapat])
- .tagsay (tagsay)
- .banliste (banlist)
- .rolbilgi (@role)
- .cezapuansil ([user])
- .isimsil ([user])
- .sicilsil ([user])
- .yasaklı-tag (ekle/sil/liste [yasaklıtag])
- .ekip ([ekle-sil-liste-kontrol-bilgi])
- .ekip-ses ([@ekiprol])
- .yetkilises (yetkilises)
- .yoklama (toplantı)
- .allmute (allmute [kanal])
- .allunmute (allunmute [kanal])
- .toplutaşı (toplutaşı [kanal])
\`\`\`
`, ephemeral: true })
};

if (interaction.values[0] === "moderasyon") {
    interaction.reply({ content : `
\`\`\`
- .kilit ([aç/kapat])
- .tagsay (tagsay)
- .banliste (banlist)
- .rolbilgi (@role)
- .cezapuansil ([user])
- .isimsil ([user])
- .sicilsil ([user])
- .yasaklı-tag (ekle/sil/liste [yasaklıtag])
- .ekip ([ekle-sil-liste-kontrol-bilgi])
- .ekip-ses ([@ekiprol])
- .yetkilises (yetkilises)
- .yoklama (toplantı)
- .allmute (allmute [kanal])
- .allunmute (allunmute [kanal])
- .toplutaşı (toplutaşı [kanal])
\`\`\`
`, ephemeral: true })
};

if (interaction.values[0] === "stat") {
    interaction.reply({ content : `
\`\`\`
- .stat (stat [user])
- .top (top)
- .nerede (sesbilgi)
- .topcoin (topcoin)
\`\`\`
`, ephemeral: true })
};

if (interaction.values[0] === "yetkili") {
    interaction.reply({ content : `
\`\`\`
- .ystat (yetkim [user])
- .cezapuan (cezapuan [user])
- .kes (kes [user])
- .rolsüz (rolsüz)
- .say (say)
- .snipe (snipe)
- .sesli (sesli)
- .sicil (sicil [user])
- .yetkili (yetkili [user])
- .taglı (taglı [user])
- .rol (r [al/ver] [user] [@role])
- .rollog (rollog [user])
- .seslisay (sesli)
- .sil (sil [miktar])
\`\`\`
`, ephemeral: true })
};

});
      
