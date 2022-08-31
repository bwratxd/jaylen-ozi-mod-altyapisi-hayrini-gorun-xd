const Discord = require("discord.js");
const conf = require("../../configs/sunucuayar.json");

module.exports = {
  conf: {
    aliases: ['reload', 'reboot', 'restart'],
    name: "reload",
    owner: true,
  },

  run: async (client, message, args) => {

    if (!args[0]) {
      await message.reply({ content: `__**Bot**__ yeniden başlatılıyor!`})
      process.exit(0)
    }
    else {
      let commandName = params[0].toLowerCase()
      let cmd = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));
      if (!cmd) {
        return message.reply({ content: `\`${commandName}\` isminde bir komut bulunamadı!`})
      }
      await client.unloadCommand(cmd.config.location, cmd.info.name);
      await client.loadCommand(cmd.config.location, cmd.info.name);
      message.channel.send({content: `\`${cmd.info.name.charAt(0).replace('i', "İ").toUpperCase() + cmd.info.name.slice(1)}\` isimli komut yeniden başlatılıyor...`})
    }

  },
};