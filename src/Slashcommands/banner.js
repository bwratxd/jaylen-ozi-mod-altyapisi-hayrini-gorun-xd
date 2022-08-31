const { SlashCommandBuilder, hyperlink } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageSelectMenu, IntegrationApplication } = require("discord.js");
const axios = require('axios');
const fetch = require('node-fetch')
const client = global.bot;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("banner")
    .setDescription("Kullanıcının yada sizin bannerınızı gönderir.")
    .addStringOption((option) =>
          option
        .setName("kişi")
        .setDescription("Bannerına bakmak istediğiniz üyeyi belirtiniz.")
    ),
  async execute(interaction, client) {

    const row = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
            .setCustomId('avatar')
            .setPlaceholder('Avatarını görüntülemek için tıklayınız!')
            .addOptions([
                {
                    label: 'Avatar',
                    description: 'Avatarını görüntülemek için tıklayınız!',
                    value: 'avatar',
                },
            ]),
    );

    const member = interaction.options.getString('kişi') || interaction.member;
		if (isNaN(member)) {
			return interaction.reply({ content: ':x: Kullanıcı id si bir sayı olmalıdır.', ephemeral: true });
		}
		try {
			await client.users.fetch(member);
		} catch (e) {
			return interaction.reply({ content: ":x: Böyle bir kullanıcı bulunamadı.", ephemeral: true });
		}
		const fetchUser = await client.users.fetch(member);
		await fetchUser.fetch(); // to get user banner you need to fetch user before getting banner

    async function bannerXd(user, client) {
        const response = await axios.get(`https://discord.com/api/v9/users/${user}`, { headers: { 'Authorization': `Bot ${client.token}` } });
        if(!response.data.banner) return `https://media.discordapp.net/attachments/938786568175513660/972982817359274024/Banner_bulunmamakta.png`
        if(response.data.banner.startsWith('a_')) return `https://cdn.discordapp.com/banners/${response.data.id}/${response.data.banner}.gif?size=512`
        else return(`https://cdn.discordapp.com/banners/${response.data.id}/${response.data.banner}.png?size=512`)
      
    }

      let banner = await bannerXd(fetchUser.id, client)

        interaction.reply({ content: `> ${ hyperlink(`${fetchUser.tag}`, `${banner}`)}`, components: [row] })
        var filter = (menu) => menu.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, componentType: 'SELECT_MENU', max: 1, time: 20000 });
       
        collector.on("collect", async (menu) => {
           if(menu.values[0] === "avatar") {
              menu.reply({ content: `> ${ hyperlink(`${fetchUser.tag}`, fetchUser.displayAvatarURL({ dynamic: true, size: 4096 }))}`, ephemeral: true })
          } 
      
        })

  }
};
