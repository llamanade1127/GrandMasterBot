const Discord = require('discord.js');

module.exports = {
    name: "ban",
    description: "bans someone",
    minArgs: 2,
    maxArgs: 2,
    async execute({message,args, text}){
        console.log(args[0]);
        if(typeof args[0] == "undefined") return message.reply("Must have a person to ban!");
        
        const {member, mentions} = message;

        if(typeof mentions == 'undefined') mentions = message.guild.members.cache.get(args[0]);
        if(typeof mentions == 'undefined') return message.reply('The id you passed is not valid!');

        var BanEmbed = new Discord.MessageEmbed();
        const tag = `<@${member.id}>`;
        var reason = text.substring(text.indexOf('>') + 1);
        if(member.hasPermission('ADMINISTRATOR') || member.hasPermission('BAN_MEMBERS')){
            const target = mentions.members.first();
            if(target){
                const targetMember = message.guild.members.cache.get(target.id);
                targetMember.ban();
                BanEmbed.setTitle(`User has been banned!`).setDescription(`User ${targetMember} has been banned for: __${reason}__`).setColor(15158332);
                message.channel.send({embed: BanEmbed}); //for reason
            } else message.reply('You must put a valid member to ban!');
        } else return message.reply('You do not have the permission to execute this command');
    },
    permissions: ["BAN_MEMBERS"],

}