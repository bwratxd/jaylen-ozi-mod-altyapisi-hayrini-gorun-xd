const { Client, Collection } = require("discord.js");
const client = global.bot = new Client({
  fetchAllMembers: true,
  intents: [ 32767 ],
}); 
const Discord = require('discord.js');

const settings = require("./src/configs/settings.json");
const conf = require("./src/configs/sunucuayar.json");
const fs = require("fs");
const jaylen = require('jaylen-db');
jaylen(client, {
    console: true,
});
client.commands = new Collection();
client.aliases = new Collection();
client.invites = new Collection();
client.cooldown = new Map();

//RANK KISMI//
client.ranks = [
  { role: "969707870457331762", coin: 2000 },
  { role: "969707868439838730", coin: 5000 },
  { role: "969707863570255923", coin: 8000 },
  { role: "969707862572007465", coin: 10000 },
  { role: "969707860860735588", coin: 13000 },
  { role: "969707856691605585", coin: 18000 },
  { role: "969707855869513738", coin: 20000 },
  { role: "969707854145675274", coin: 23000 },
  { role: "969707850249175120", coin: 25000 },
  { role: "969707848378507355", coin: 30000 },
  { role: "969707846608486420", coin: 32000 },
  { role: "969707842993012797", coin: 35000 },
  { role: "969707841768292383", coin: 38000 },
  { role: "969707841139134484", coin: 40000 },
  { role: "969707840090566678", coin: 50000 },
  ]
//KOMUT ÇALIŞTIRMA
fs.readdir('./src/commands/', (err, files) => {
  if (err) console.error(err);
  console.log(`[ozi] ${files.length} komut yüklenecek.`);
  files.forEach(f => {
    fs.readdir("./src/commands/" + f, (err2, files2) => {
      files2.forEach(file => {
        let props = require(`./src/commands/${f}/` + file);
        console.log(`[ozi KOMUT] ${props.conf.name} komutu yüklendi!`);
        client.commands.set(props.conf.name, props);
        props.conf.aliases.forEach(alias => {
          client.aliases.set(alias, props.conf.name);
        });
      })
    })
  });
});
require("./src/handlers/eventHandler");
require("./src/handlers/mongoHandler");
require("./src/handlers/functionHandler")(client);

client
  .login(settings.token)
  .then(() => console.log("Bot Başarıyla Bağlandı!"))
  .catch(() => console.log("[HATA] Bot Bağlanamadı!"));

  process.on("uncaughtException", err => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    console.error("Beklenmedik yakalanamayan hata: ", errorMsg);
    process.exit(1);
  });
  
  process.on("unhandledRejection", err => {
    console.error("Promise Hatası: ", err);
  });


  ///// slash commands
  const { REST } = require('@discordjs/rest');
  const { Routes } = require('discord-api-types/v9');  
  client.slashcommands = new Collection();
  var slashcommands = [];
  
  fs.readdirSync("./src/Slashcommands/").forEach((file) => {
    const command = require(`./src/Slashcommands/${file}`);
    client.slashcommands.set(command.data.name, command);
    slashcommands.push(command.data.toJSON());
  });
  
  const rest = new REST({ version: '9' }).setToken(settings.token);
  (async () => {
    try {
      console.log('[ozi] Slash Komutlar yükleniyor.');
      await rest.put(
        Routes.applicationCommands(settings.BotClientID),
        { body: slashcommands },
      );
      console.log('[ozi] Slash Komutlar yüklendi.');
    } catch (error) {
      console.error(error);
    }
  })();
  
  client.on('interactionCreate', (interaction) => {
    if (!interaction.isCommand()) return;
    const command = client.slashcommands.get(interaction.commandName);
    if (!command) return;
    try {
       command.execute(interaction, client);
    } catch (err) {
      if (err) console.error("Error: ", err);
    }
  });
