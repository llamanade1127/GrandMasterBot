const Discord = require('discord.js');
module.exports = (member) => {
    var {leaveMessageChannel} = require('../../config.json');
    var memberCount = member.guild.members.filter(_member => !_member.user.bot).size;
    var date =  new Date();
    var day = date.getDate();
    var embed = new Discord.MessageEmbed().setTitle('Goodbye!').setDescription(`<@${memeber.id}> has left the Grand Master Community! \n Left: ${day} \n Total Members: ${memberCount}`).setFooter(Date.toString());

    var channel = member.guild.channels.cache.get(leaveMessageChannel);

    channel.send({embed: embed});
} 