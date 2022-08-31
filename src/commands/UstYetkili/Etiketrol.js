module.exports = {
    conf: {
      aliases: ["etiketrol"],
      name: "etiketrol",
      help: "etiketrol"
    },
  
    run: async (client, message, args, embed, prefix) => {
if (!message.member.permissions.has(8n)) return message.channel.send({ embeds: [embed.setDescription(`${message.author}, Bu komutu kullanmak için yeterli yetkiye sahip değilsin!`)] }).then((e) => setTimeout(() => { e.delete(); }, 5000));
  
let tag = args[0];
let etiket = args[1]; 
let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]);
if(!tag) return message.channel.send({ content:`\`Gerekli argümanları doğru kullanın.\` __Örn:__ \`${prefix}${module.exports.conf.name} Tag Etiket <@Rol/ID>\``});
if(!etiket) return message.channel.send({ content:`\`Gerekli argümanları doğru kullanın.\` __Örn:__ \`${prefix}${module.exports.conf.name} Tag Etiket <@Rol/ID>\``});
if(!rol) return message.channel.send({ content:`\`Gerekli argümanları doğru kullanın.\` __Örn:__ \`${prefix}${module.exports.conf.name} Tag Etiket <@Rol/ID>\``});
message.guild.members.cache.filter(s => s.user.discriminator === etiket || s.user.username.includes(tag) && !s.roles.cache.has(rol)).forEach(m => m.roles.add(rol))
message.channel.send({ content:`Kullanıcı adında \`${tag}\` ve etiketinde \`#${etiket}\` bulunduran kullanıcılara \`${rol.name}\` adlı rol veriliyor.`})

}
}