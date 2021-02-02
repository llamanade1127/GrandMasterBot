

module.exports = {
    name: "ban",
    description: "bans someone",
    async execute(message,args){
        if(args[0]) return message.reply("Must have a person to ban!");
        
        const {member, mentions} = message;

        const tag = `<@${member.id}>`;

        if(member.hasPermission('ADMINISTRATOR') || member.hasPermission('BAN_MEMBERS')){
            const target = mentions.user.first();
            if(target){
                const targetMember = message.guild.members.cache.get(target.id);
                targetMember.ban();
                if(!args[1] && !args[1] == '-s'){ //Only send if there is no valid reason
                    if(args[2]){
                        message.channel.send(`<@${targetMember.id}> has been banned by ${tag} for ${args[2]}!`); //for reason
                    } else{
                        message.channel.send(`<@${targetMember.id}> has been banned by ${tag}!`); //send without reason
                    }
                } 
            } else message.reply('You must put a valid member to ban!');
        } else return message.reply('You do not have the permission to execute this command');
    }
}