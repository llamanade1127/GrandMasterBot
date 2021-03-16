const Discord = require("discord.js");


module.exports = {
    name: "kick",
    description: "kicks someone",
    minArgs: 2,
    async execute({message,args, text}){
        if(!args[0]) return message.reply("Must have a person to ban!");
        
        const {member, mentions} = message;

        if(typeof mentions == 'undefined') mentions = message.guild.members.cache.get(args[0]);
        if(typeof mentions == 'undefined') return message.reply('The id you passed is not valid!');

        const tag = `<@${member.id}>`;

        if(typeof args[1] == 'undefined') return message.reply('You must input a reason!');
        var reason = text.substring(text.indexOf(">") + 1);
        if(member.hasPermission('ADMINISTRATOR') || member.hasPermission('KICK_MEMBERS')){
            const target = mentions.user.first();
            if(target){
                var kickEmbed = new Discord.MessageEmbed().setTitle("User has been kicked!").addField(`${target} has been kicked by:`, ` ${message.author}.`).addField(`Reason`, reason).setColor(15158332);;
                const targetMember = message.guild.members.cache.get(target.id);
                targetMember.kick();
                message.channel.send({embed: kickEmbed}); //for reason
            } else message.reply('You must put a valid member to kick!');
        } else return message.reply('You do not have the permission to execute this command');
    },
    permissions: ['ADMINISTRATOR', 'KICK_MEMBERS']
}