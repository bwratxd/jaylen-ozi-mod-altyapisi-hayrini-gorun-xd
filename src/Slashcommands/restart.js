const { SlashCommandBuilder, hyperlink  } = require("@discordjs/builders");
const { MessageEmbed, IntegrationApplication } = require("discord.js");
const Config = require("../configs/settings.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("restart")
    .setDescription("Moderasyon Botunu yeniden başlatmaya yarar."),

  async execute(interaction, client) {
   if(!Config.owners.includes(interaction.user.id)) {
        return interaction.reply({ content: ":x: Bot developerı olmadığın için kullanamazsın.", ephemeral: true })
    }
    await interaction.reply({ content: `__**Bot**__ yeniden başlatılıyor!`, ephemeral: true })
    process.exit(0)
}
  };