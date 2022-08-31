const conf = require("../configs/sunucuayar.json")
const { green } = require("../configs/emojis.json");

module.exports = async (message) => {
  if (message.content.toLowerCase() === "tag" || message.content.toLowerCase() === "!tag" || message.content.toLowerCase() === ".tag") {
    message.react(green);
    message.reply({ content: `${conf.tag}`});
  }
};
module.exports.conf = {
  name: "messageCreate"
};