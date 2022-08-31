const conf = require("../../configs/sunucuayar.json")
module.exports = {
  conf: {
    aliases: ["kilit","lock"],
    name: "kilit",
    help: "kilit"
  },

  run: async (client, message, args, embed, prefix) => {
    if (!message.member.permissions.has("MANAGE_CHANNELS")) return;
    if (!args[0]) { message.channel.send({ content:`\`${prefix}kilit <aç/kapat>\``}).then((e) => setTimeout(() => { e.delete(); }, 5000));
    return }

    if (args[0] == "kilit" || args[0] == "kapat" || args[0] == "kilitle") {
      let everyone = message.guild.roles.cache.find(r => r.name === "@everyone");
      message.channel.permissionOverwrites.edit(everyone.id, {
          SEND_MESSAGES: false
      }).then(async() => {
          message.react("🔒")
          await message.reply({ content:"Kanal başarıyla kilitlendi."})
      })
  }

  if (args[0] == "aç") {
      let everyone = message.guild.roles.cache.find(r => r.name === "@everyone");
      message.channel.permissionOverwrites.edit(everyone.id, {
        SEND_MESSAGES: null
      }).then(async() => {
          message.react("🔓")
          await message.reply({ content:"Kanalın kilidi başarıyla açıldı."})
      })
  }
  },
};

