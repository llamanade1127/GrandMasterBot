
//TODO: Need to add prefix and main and mute roles to config

module.exports = {
    name: "mute",
    description: "mutes someone",
    args:'1: -t TIME for time, 2: -s for silent 3: -r REASON',
    minArgs: 1,
    example: `!kick -t 20 -r Was toxic`,
    async execute({message,args,text}){
        
        const {member, mentions} = message;
        
        if(typeof mentions == 'undefined') mentions = message.guild.members.cache.get(args[0]);
        if(typeof mentions == 'undefined') return message.reply('The id you passed is not valid!');

        const tag = `<@${member.id}>`;

        var reason = text.slice(text.indexOf(">") + 1);
        
        let mainRole = message.guild.roles.cache.find(role => role.name === "member");
        let muteRole = message.guild.roles.cahce.find(role => role.name === 'mute');

        if(member.hasPermission('ADMINISTRATOR') || member.hasPermission('MUTE_MEMBERS')){
            const target = mentions.user.first();
            if(target){
                const targetMember = message.guild.members.cache.get(target.id);
                //gets the main roles
                targetMember.roles.remove(mainRole.id);
                targetMember.roles.add(muteRole.id);
                message.channel.send(`<@${targetMember.id}> has been muted because ${reason}!`);
            } else message.reply('You must put a valid member to kick!');
        } else return message.reply('You do not have the permission to execute this command');
    }
}