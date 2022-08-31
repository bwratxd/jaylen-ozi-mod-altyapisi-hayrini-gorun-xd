const { green, red } = require("../../configs/emojis.json")
module.exports = {
    conf: {
      aliases: ["sil","temizle"],
      name: "sil",
      help: "sil"
    },
  
    run: async (client, message, args, embed) => {
        if (!message.member.permissions.has('MANAGE_MESSAGES')) return;
        if (!args[0]) return message.channel.send({ content:`${red} Bir miktar belirtmelisin!`}).then((e) => setTimeout(() => { e.delete(); }, 5000));
        if (isNaN(args[0])) return message.channel.send({ content:`${red} Belirttiğin miktar bir sayı olmalı!`}).then((e) => setTimeout(() => { e.delete(); }, 5000));
        await message.delete();
        await message.channel.bulkDelete(args[0]);
        message.channel.send({ content:`${green} ${args[0]} adet mesaj silindi!`}).then((e) => setTimeout(() => { e.delete(); }, 5000));
      },
    };
    
    
  
  