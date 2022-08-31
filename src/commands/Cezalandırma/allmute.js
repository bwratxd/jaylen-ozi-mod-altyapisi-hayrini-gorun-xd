const moment = require("moment");
moment.locale("tr");
module.exports = {
  conf: {
    aliases: ["allmute"],
    name: "allmute",
    help: "allmute"
  },

  run: async (client, message, args, embed) => {
    if (!message.member.permissions.has("MOVE_MEMBERS")) return;
    let channel = message.guild.channels.cache.get(args[0]) || message.member.voice.channel;
    if (!channel) return message.channel.send({ content:"Bir kanal ID girmeli ya da bir sesli kanalda bulunmalısın!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
    channel.members.filter((x) => !x.permissions.has("ADMINISTRATOR"))
      .forEach((x, index) => {
        client.wait(index * 1000);
        x.voice.setMute(true);
      });
    message.reply({ content:`🎤 \`${channel.name}\` kanalındaki tüm üyeler susturuldu!`}).then((e) => setTimeout(() => { e.delete(); }, 10000));
  },
};

